import {
    boardGet,
    taskAssignPost, taskAssignDelete,
    taskChecklistDelete,
    taskChecklistGet,
    taskChecklistItemPost,
    taskChecklistItemPut,
    taskChecklistPost,
    taskCommentsGet,
    taskCommentsPost,
    taskDelete,
    taskGet,
    taskPut,
} from '../libs/apiService.js';

/**
 * Task settings model
 */
export default class TaskSettingsModel {
    /**
     * Task settings model constructor
     * @param {Object} eventBus to share events with task settings view
     * @param {number} boardID - board id
     * @param {number} columnID - column id
     * @param {number} taskID - task id
     */
    constructor(eventBus, boardID, columnID, taskID) {
        this.eventBus = eventBus;
        this.taskData = {boardID, columnID, taskID};

        this.eventBus.subscribe('getTaskSettings', this.getTaskSettings.bind(this));
        this.eventBus.subscribe('getTaskAssigns', this.getTaskAssign.bind(this));

        this.eventBus.subscribe('saveTaskSettings', this.saveTaskSettings.bind(this));
        this.eventBus.subscribe('deleteTask', this.deleteTask.bind(this));
        this.eventBus.subscribe('addComment', this.addTaskComment.bind(this));
        this.eventBus.subscribe('addChecklist', this.addChecklist.bind(this));
        this.eventBus.subscribe('deleteChecklist', this.deleteChecklist.bind(this));
        this.eventBus.subscribe('addChecklistItem', this.addChecklistItem.bind(this));
        this.eventBus.subscribe('updateChecklistItem', this.updateChecklistItem.bind(this));
        this.eventBus.subscribe('updateAssign', this.updateAssign.bind(this));
    }

    /**
     * Handles response from api calls, call callback in case of status 200
     * @param {Object} response from backend
     * @param {Function} onSuccess - calls it in case of response status 200;
     * @return {Promise<boolean>} - true if response status is 200, otherwise call eventBus with error reaction signal
     */
    async handleResponseStatus(response, onSuccess) {
        switch (response.status) {
            case 200:
                let body;
                try {
                    body = await response.json();
                } catch (e) {}
                onSuccess(body);
                return true;
            case 401:
                this.eventBus.call('unauthorized');
                return false;
            case 400:
            case 403:
            case 500:
                this.eventBus.call('goToBoards');
                return false;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                return false;
        }
    };

    /**
     * Add comment to task
     * @param {String} commentText
     */
    async addTaskComment(commentText) {
        const response = await taskCommentsPost(this.taskData, commentText);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 403:
                this.eventBus.call('goToBoards');
                break;
            case 400:
            case 500:
                break;
            default:
                console.log('Бекендер молодец!!!');
                break;
        }
    }

    /**
     * Add new checklist
     * @param {String} checklistName
     */
    async addChecklist(checklistName) {
        const response = await taskChecklistPost(this.taskData, checklistName);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 403:
                this.eventBus.call('goToBoards');
                break;
            case 400:
            case 500:
                break;
            default:
                console.log('Бекендер молодец!!!');
                break;
        }
    }

    /**
     * Delete checklist from task
     * @param {Number} checklistID
     */
    async deleteChecklist(checklistID) {
        const response = await taskChecklistDelete(this.taskData, checklistID);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 400:
            case 403:
            case 500:
                this.eventBus.call('goToBoards');
                break;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                break;
        }
    }

    /**
     * Add new item in checklist
     * @param {Object} itemData
     */
    async addChecklistItem(itemData) {
        const response = await taskChecklistItemPost(this.taskData, itemData);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 400:
            case 403:
            case 500:
                this.eventBus.call('goToBoards');
                break;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                break;
        }
    }

    /**
     * Update item value
     * @param {Number} checklistId
     * @param {Object} itemData
     */
    async updateChecklistItem(checklistId, itemData) {
        const response = await taskChecklistItemPut(this.taskData, checklistId, itemData);
        switch (response.status) {
            case 200:
                // this.getTaskSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 400:
            case 403:
            case 500:
                this.eventBus.call('goToBoards');
                break;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                break;
        }
    }

    /**
     * Returns task information
     */
    async getTaskSettings() {
        let taskData;
        const taskResponse = await taskGet(this.taskData);
        if (!(await this.handleResponseStatus(taskResponse, (body) => taskData = body))) {
            return;
        }

        const checklistResponse = await taskChecklistGet(this.taskData);
        if (!(await this.handleResponseStatus(checklistResponse, (body) => taskData.checklists = body))) {
            return;
        }

        for (const checklist of taskData.checklists) {
            if (checklist.items) {
                let itemsDone = 0;
                checklist.items.forEach((item) => {
                    if (item.done) {
                        itemsDone++;
                    }
                });
                checklist.progress = Math.floor(itemsDone / checklist.items.length * 100) || 0;
                checklist.progressColor = (checklist.progress < 33) ? '#eb5a46' :
                    (checklist.progress < 66) ? '#f2d600' : '#61bd4f';
            }
        }

        const commentsResponse = await taskCommentsGet(this.taskData);
        if (!(await this.handleResponseStatus(commentsResponse, (body) => {
            taskData.comments = new Array(body.length);
            body.forEach((comment, i) => {
                const date = new Date(comment.createdAt * 1000);
                const parsedDate = {
                    day: (date.getDate() > 9) ? date.getDate() : '0' + date.getDate(),
                    month: (date.getMonth() > 9) ? date.getMonth() : '0' + date.getMonth(),
                    year: date.getFullYear(),
                    hours: (date.getHours() > 9) ? date.getHours() : '0' + date.getHours(),
                    minutes: (date.getMinutes() > 9) ? date.getMinutes() : '0' + date.getMinutes(),
                    seconds: (date.getSeconds() > 9) ? date.getSeconds() : '0' + date.getSeconds(),
                };
                let dateString = `${parsedDate.day}.${parsedDate.month}.${parsedDate.year}`;
                dateString += ` ${parsedDate.hours}:${parsedDate.minutes}:${parsedDate.seconds}`;
                taskData.comments[i] = {
                    date: dateString,
                    text: comment.text,
                    avatar: comment.avatar || '/img/default_avatar.png',
                    nickname: comment.nickname || 'vasYa_pupKin',
                };
            });
        }))) {
            return;
        }

        const defaultTaskData = {
            /*            members: [
                            {
                                url: '/mem1',
                                nickname: 'member 1',
                                avatar: '/img/default_avatar.png',
                            },
                            {
                                url: '/mem2',
                                nickname: 'member 2',
                                avatar: '/img/default_avatar.png',
                            },
                        ],*/
            labels: [
                {
                    title: 'label 1',
                    color: 'red',
                },
                {
                    title: 'label 2',
                    color: 'darkblue',
                },
            ],
        };

        this.eventBus.call('gotTaskSettings', {...defaultTaskData, ...taskData});
    }

    /**
     * Returns board members with assigned to task flag;
     */
    async getTaskAssign() {
        let boardMembers;
        const boardResponse = await boardGet(this.taskData.boardID);
        if (!(await this.handleResponseStatus(boardResponse, (body) => {
            boardMembers = [...(body.members || []), ...(body.admins || [])];
        }))) {
            return;
        }

        let assignedMembers;
        const assignsResponse = await taskGet(this.taskData);
        if (!(await this.handleResponseStatus(assignsResponse, (body) => {
            assignedMembers = new Set(body.members?.map((id, i) => body.members[i].id));
        }))) {
            return;
        }

        boardMembers.forEach((member) => {
            member.assigned = assignedMembers.has(member.id);
        });
        this.eventBus.call('gotTaskAssigns', boardMembers);
    }

    /**
     * Set or unset task assign on user
     * @param {number} userId
     * @param {boolean} assigned
     */
    async updateAssign(userId, assigned) {
        let response;
        if (assigned) {
            response = await taskAssignPost(this.taskData, userId);
        } else {
            response = await taskAssignDelete(this.taskData, userId);
        }
        await this.handleResponseStatus(response, () => {
            this.eventBus.call('assignSuccess');
        });
    }

    /**
     * Saves task information
     * @param {Object} taskData
     * @return {Promise<void>}
     */
    async saveTaskSettings(taskData) {
        const response = await taskPut(this.taskData, taskData);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 403:
                this.eventBus.call('goToBoards');
                break;
            case 400:
            case 500:
                break;
            default:
                console.log('Бекендер молодец!!!');
                break;
        }
    }

    /**
     * Deletes task
     * @return {Promise<void>}
     */
    async deleteTask() {
        const response = await taskDelete(this.taskData);
        switch (response.status) {
            case 200:
                this.eventBus.call('closeSelf');
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 403:
                this.eventBus.call('goToBoards');
                break;
            case 400:
            case 500:
                break;
            default:
                console.log('Бекендер молодец!!!');
                break;
        }
    }
}

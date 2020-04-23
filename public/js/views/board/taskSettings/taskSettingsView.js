import {ChainLinkSignals} from '../../../libs/controllerChainLink.js';
import BaseView from '../../baseView.js';
import template from './taskSettings.tmpl.xml';

/**
 * Task settings view
 */
export default class TaskSettingsView extends BaseView {
    /**
     * Task settings view constructor
     * @param {Object} eventBus - eventBus to share events with model
     */
    constructor(eventBus) {
        super(eventBus);

        this.render = this.render.bind(this);
        this.renderTaskSettings = this.renderTaskSettings.bind(this);
        this.closeSelf = this.closeSelf.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.eventBus.subscribe('gotTaskSettings', this.renderTaskSettings);
        this.scrollHeight = 0;

        this.root = document.getElementById('popover-block');
    }

    /**
     * Method which triggers getting data from model
     */
    render() {
        this.eventBus.call('getTaskSettings');
    }

    /**
     * Real render view method with task data from model
     * @param {Object} taskData - task data to render
     */
    renderTaskSettings(taskData) {
        this.root.innerHTML = template(taskData);
        document.querySelector('.task')?.scrollTo(0, this.scrollHeight);
        this.addEventListeners();
    }

    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        const taskSettingsElements = [
            this.root.querySelector('.task'),
            this.root.querySelector('.window-overlay'),
            this.root.querySelector('.js-addNewLabel'),
            this.root.querySelector('.js-addNewTaskMember'),
            this.root.querySelector('.js-attachFile'),
            this.root.querySelector('.js-saveTask'),
            this.root.querySelector('.js-deleteTask'),
            this.root.querySelector('.js-saveComment'),
            this.root.querySelector('.js-addNewChecklist'),
            ...this.root.querySelectorAll('.js-addNewChecklistItem'),
            ...this.root.querySelectorAll('.js-closeChecklistItemForm'),
            ...this.root.querySelectorAll('.js-createChecklistItem'),
            ...this.root.querySelectorAll('.js-deleteChecklist'),
        ];

        taskSettingsElements.forEach((element) => {
            element.addEventListener('click', this.handleClick);
        });
    }

    /**
     * Handles all clicks
     * @param {MouseEvent} event
     */
    handleClick(event) {
        const classList = event.currentTarget.classList;
        switch (true) {
            case classList.contains('task'):
                this.eventBus.call(ChainLinkSignals.closeLastChainLink);
                break;

            case classList.contains('js-addNewLabel'):
                event.stopPropagation();
                this.eventBus.call('openAddLabelPopup', event.target);
                break;

            case classList.contains('js-addNewChecklist'):
                event.stopPropagation();
                this.eventBus.call('openAddChecklistPopup', event.target);
                break;

            case classList.contains('js-addNewChecklistItem'):
            case classList.contains('js-closeChecklistItemForm'): {
                const checklistElement = event.currentTarget.closest('.checklist');
                checklistElement.querySelector('.js-checklist-add-item-form').classList.toggle('display-none');
                checklistElement.querySelector('.js-checklist-controls').classList.toggle('display-none');
                checklistElement.querySelector('.js-inputNewItemTitle').focus();
                break;
            }
            case classList.contains('js-deleteChecklist'): {
                const checklistElement = event.currentTarget.closest('.checklist');
                const checklistID = checklistElement.dataset.checklistId;
                this.eventBus.call('deleteChecklist', checklistID);
                break;
            }
            case classList.contains('js-createChecklistItem'):
                const checklistElement = event.currentTarget.closest('.checklist');
                const checklistID = checklistElement.dataset.checklistId;
                const text = checklistElement.querySelector('.js-inputNewItemTitle').value;
                if (text) {
                    this.eventBus.call('addChecklistItem', {checklistID, text, isDone: false});
                }
                break;

            case classList.contains('js-saveTask'):
                const description = this.root.querySelector('.js-inputDescription')?.innerText;
                const title = this.root.querySelector('.js-inputTitle')?.value;
                this.eventBus.call('saveTaskSettings', {title, description});
                break;

            case classList.contains('js-deleteTask'):
                this.eventBus.call('deleteTask');
                break;

            case classList.contains('js-saveComment'):
                const commentText = this.root.querySelector('.js-commentText').innerText;
                if (commentText.length !== 0) {
                    this.scrollHeight = this.root.querySelector('.task').scrollTop + 300;
                    this.eventBus.call('addComment', commentText);
                }
                break;

            case classList.contains('window-overlay'):
                if (event.target === event.currentTarget) {
                    this.eventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
                }
                break;

            default:
                break;
        }
    }

    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        this.root.innerText = '';
    }
}

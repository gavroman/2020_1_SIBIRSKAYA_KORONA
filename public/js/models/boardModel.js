/**
 * Board model
 */
export default class BoardModel {
    /**
     * Board model constructor
     * @param {Object} eventBus - to share events with board view
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.getBoardData = this.getBoardData.bind(this);

        eventBus.subscribe('getData', this.getBoardData);
    }

    /**
     * Returns board data
     */
    getBoardData() {
        const boardData = {
            title: 'MyBoardName',
            members: [
                {
                    url: '/mem1',
                    nickname: 'member 1',
                    avatar: 'img/default_avatar.png',
                },
                {
                    url: '/mem2',
                    nickname: 'member 2',
                    avatar: 'img/default_avatar.png',
                },
            ],
            columns: [
                {
                    title: 'COLUMN 1',
                    tasks: [
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
                {
                    title: 'COLUMN 2',
                    tasks: [
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
                {
                    title: 'COLUMN 1',
                    tasks: [
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
                {
                    title: 'COLUMN 2',
                    tasks: [
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
                {
                    title: 'COLUMN 1',
                    tasks: [
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
                {
                    title: 'COLUMN 2',
                    tasks: [
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
                {
                    title: 'COLUMN 1',
                    tasks: [
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
                {
                    title: 'COLUMN 2',
                    tasks: [
                        {
                            labels: [
                                {
                                    title: 'Label 1',
                                },
                                {
                                    title: 'Label 2',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                        {
                            labels: [
                                {
                                    title: 'Label 3',
                                },
                                {
                                    title: 'Label 4',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
            ],
        };

        this.eventBus.call('gotData', boardData);
    }
}
import AddLabelPopupModel from '../models/addLabelPopupModel.js';
import AddLabelPopupView from '../views/addLabelPopup/addLabelPopupView.js';
import EventBus from '../libs/eventBus.js';
import CreateLabelPopupController from './createLabelPopupControl.js';

/**
 * Add label popup controller
 */
export default class AddLabelPopupController {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     */
    constructor(parentEventBus) {
        this.eventBus = new EventBus([
            'closedChild', // internal signal
            'closeLastChild', // outside signal
            'closeLastChildOrSelf', // outside signal
            'closeAllChildren', // outside signal
            'closeAllChildrenAndSelf', // outside signal

            'closeSelf',

            'getLabels',
            'gotLabels',

            'openCreateLabelPopup',
            'closedCreateLabelPopup',

            'openChangeLabelPopup',
            'closedChangeLabelPopup',
        ]);

        this.view = new AddLabelPopupView(this.eventBus);
        this.model = new AddLabelPopupModel(this.eventBus);


        this.eventBus.subscribe('openCreateLabelPopup', (button)=>{
            const childController = new CreateLabelPopupController(this.eventBus);
            this.childEventBus = childController.eventBus;
            childController.view.render(button.getBoundingClientRect());
        });

        this.eventBus.subscribe('closedCreateLabelPopup', ()=>{
            this.view.render();
        });


        this.eventBus.subscribe('closeSelf', () => {
            this.view.closeSelf();
            if (this.parentEventBus !== null) {
                this.parentEventBus.call('closedChild');
            }

            parentEventBus.call('closedAddLabelPopup');
        });


        this.parentEventBus = parentEventBus;
        this.childEventBus = null;

        this.eventBus.subscribe('closedChild', () => {
            this.childEventBus = null;
        });

        this.eventBus.subscribe('closeLastChild', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeLastChildOrSelf');
            }
        });

        this.eventBus.subscribe('closeLastChildOrSelf', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeLastChildOrSelf');
            } else {
                this.eventBus.call('closeSelf');
            }
        });

        this.eventBus.subscribe('closeAllChildren', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeAllChildrenAndSelf');
                this.childEventBus = null;
            }
        });

        this.eventBus.subscribe('closeAllChildrenAndSelf', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeAllChildrenAndSelf');
            }

            this.eventBus.call('closeSelf');
        });
    }
}

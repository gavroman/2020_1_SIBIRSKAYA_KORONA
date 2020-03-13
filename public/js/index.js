import Router from './libs/router.js';
import EventBus from './libs/eventBus.js';
import JoinController from './controllers/joinControl.js';
import LoginController from './controllers/loginControl.js';
import ProfileController from './controllers/profileControl.js';
import HeaderController from './controllers/headerControl.js';
import BoardController from './controllers/boardControl.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const router = new Router(root);

    const globalEventBus = new EventBus([
        'logout',
        'login',
        'userDataChanged',
    ]);

    const headerController = new HeaderController(router, globalEventBus);
    const profileController = new ProfileController(router, globalEventBus);
    const joinController = new JoinController(router);
    const loginController = new LoginController(router);
    const boardController = new BoardController(router);

    router.setRoute('/', profileController.view.render);
    router.setRoute('/login', loginController.view.render);
    router.setRoute('/profile', profileController.view.render);
    router.setRoute('/join', joinController.view.render);
    router.setRoute('/board', boardController.view.render);

    headerController.view.render({});
    router.go(window.location.pathname);
});

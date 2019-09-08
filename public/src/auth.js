import AuthApp from './components/AuthApp.js';

const app = new AuthApp();
document.body.prepend(app.renderDOM());
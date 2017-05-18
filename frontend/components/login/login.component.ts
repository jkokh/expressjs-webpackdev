import LoginController from './login.controller';
import './login.sass';

let loginComponent: ng.IComponentOptions = {
    template: require('./login.html'),
    controller:  LoginController
};

export default loginComponent;

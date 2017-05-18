import * as angular from "angular";
import loginComponentOptions from './login.component';
import { LoginService } from './login.service';

let loginModule: ng.IModule = angular.module('loginModule', []);

loginModule.component('login', loginComponentOptions);
loginModule.service('LoginService', LoginService);

let loginModuleName: string = loginModule.name;

export default loginModuleName;



import * as angular from "angular";
import loginModuleName from './login/login';

let componentsModule: ng.IModule = angular.module('app.components', [
    loginModuleName
]);

let componentsModuleName: string = componentsModule.name;

export default componentsModuleName;

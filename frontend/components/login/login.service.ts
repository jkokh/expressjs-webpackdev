import { IUserLogin } from './login.controller';
import IPromise = angular.IPromise;
import * as angular from "angular";

export class LoginService {

    /** @ngInject */
    constructor(private $http: angular.IHttpService) {
    }

    login(loginData: IUserLogin): IPromise<any> {
        return this.$http(
            {
                method: 'POST',
                url: '/api/login',
                data: loginData
            })
        .then((response: any): any => {
            return response.data;
        });
    }
}

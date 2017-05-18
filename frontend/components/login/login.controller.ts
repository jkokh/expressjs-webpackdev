import { LoginService } from './login.service';

export interface IUserLogin {
    email: string;
    password: string;
    remember: boolean;
}

class LoginController {

    user: IUserLogin;

    /** @ngInject */
    constructor(private LoginService: LoginService) {
    }

    login() {
    }

}

export default LoginController;

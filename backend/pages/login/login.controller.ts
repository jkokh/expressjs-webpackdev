import { Request, Response } from 'express';
let tpl = require.resolve('./login.template.ejs');

export class LoginController {

    constructor(private req: Request, private res: Response, private next: any) {
    }

    renderPage() {
        this.res.render(tpl, {
            title: 'Login'
        });
    }

}

import { Request, Response } from 'express';
let tpl = require.resolve('./signup.template.ejs');

export class SignupController {

    constructor(private req: Request, private res: Response, private next: any) {
    }

    renderPage() {
        this.res.render(tpl, {
            title: 'Sign Up'
        });
    }

}

import { Request, Response } from 'express';
let tpl = require.resolve('./home.template.ejs');

export class HomeController {

    constructor(private req: Request, private res: Response, private next: any) {
    }

    renderPage() {
        this.res.render(tpl, {
            title: 'Home'
        });
    }

}

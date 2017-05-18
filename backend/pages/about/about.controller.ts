import { Request, Response } from 'express';
let tpl = require.resolve('./about.template.ejs');

export class AboutController {

    constructor(private req: Request, private res: Response, private next: any) {
    }

    renderPage() {
        this.res.render(tpl, {
            title: 'About'
        });
    }

}

import { Request, Response } from 'express';
let tpl = require.resolve('./contacts.template.ejs');

export class ContactsController {

    constructor(private req: Request, private res: Response, private next: any) {
    }

    renderPage() {
        this.res.render(tpl, {
            title: 'Contacts'
        });
    }

}

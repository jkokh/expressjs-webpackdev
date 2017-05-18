import * as express from "express";
import { Server } from '../../server/server';
import { ContactsController } from './contacts.controller';

export default (server: Server) => {

    server.express.get('/contacts',
        (req: express.Request, res: express.Response, next: any) => {
            let ctrl = new ContactsController(req, res, next);
            ctrl.renderPage();
        });

}

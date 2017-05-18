import * as express from "express";
import { Server } from '../../server/server';
import { AboutController } from './about.controller';

export default (server: Server) => {

    server.express.get('/about',
        (req: express.Request, res: express.Response, next: any) => {
            let ctrl = new AboutController(req, res, next);
            ctrl.renderPage();
        });

}

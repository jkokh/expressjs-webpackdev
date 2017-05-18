import * as express from "express";
import { Server } from '../../server/server';
import { HomeController } from './home.controller';

export default (server: Server) => {

    server.express.get('/',
        (req: express.Request, res: express.Response, next: any) => {
            let ctrl = new HomeController(req, res, next);
            ctrl.renderPage();
        });

}

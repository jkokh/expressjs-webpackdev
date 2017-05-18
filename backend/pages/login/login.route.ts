import * as express from "express";
import { Server } from '../../server/server';
import { LoginController } from './login.controller';

export default (server: Server) => {

    server.express.get('/login',
        (req: express.Request, res: express.Response, next: any) => {
            let ctrl = new LoginController(req, res, next);
            ctrl.renderPage();
        });

}

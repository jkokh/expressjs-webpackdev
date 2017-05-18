import * as express from "express";
import { Server } from '../../server/server';
import { SignupController } from './signup.controller';

export default (server: Server) => {

    server.express.get('/signup',
        (req: express.Request, res: express.Response, next: any) => {
            let ctrl = new SignupController(req, res, next);
            ctrl.renderPage();
        });

}

import { Server } from './server';
import { Request, Response } from 'express';
export class ErrorHandler {

    constructor(private server: Server) {

        server.express.get('*',
            (req: Request, Response: any, next: any) => {
                let err: any =  new Error();
                err.status = 404;
                next(err);
            });

        server.express.use((err: any, req: Request, res: Response, next: any) => {
            let status = 500;
            let view = 'errors/error';
            let message = err.message ? err.message : 'Server error';
            let title = 'Server error';
            switch (err.status) {
                case 401:
                    view = 'errors/401';
                    status = err.status;
                    title = 'Error 401';
                    message = err.message ? err.message : 'Authorization required';
                    break;
                case 403:
                    view = 'errors/403';
                    status = err.status;
                    message = err.message ? err.message : 'Forbidden';
                    title = 'Error 403 - Forbidden';
                    break;
                case 404:
                    view = 'errors/404';
                    status = err.status;
                    message = err.message ? err.message : 'Страница не найдена';
                    title = 'Error 404 - Not found';
                    break;
            }
            // choose between html and json output
            if (/text\/html/.test(req.get('accept'))) {
                res.status(status).render(view, {
                    title,
                    status
                });
            } else {
                res.status(status).json({
                    message,
                    status
                });
            }
        });
    }

}

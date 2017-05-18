import { Express } from 'express';
import { ErrorHandler } from './error.handler';
import * as express from 'express';
import * as config from 'config';
import * as bodyParser from 'body-parser';
import Routes from '../pages/routes';

let expressLayouts: any = require('express-ejs-layouts');

export class Server {

    express: Express;
    listening: any;

    constructor() {
        this.express = express();
    }

    init() {
        this.listen();
        Routes(this);
        new ErrorHandler(this);
    }

    private listen() {

        let app = this.express;

        let isLocal = config.get('env') === 'localhost';
        let port = config.get('port');

        app.use(express.static('./public'));

        // We want to run the workflow only in dev mode
        if (isLocal) {

            const httpProxy = require('http-proxy');
            let proxy = httpProxy.createProxyServer();
            // We require the bundler inside the if block because
            // it is only needed in a development environment.
            let bundle = require('./bundle')();

            // Any requests to localhost:3000/build is proxied
            // to webpack-dev-server

            app.all('/build/*', (req: any, res: any) => {
                proxy.web(req, res, {
                    target: 'http://localhost:8111'
                });
            });

            // It is important to catch any errors from the proxy or the
            // server will crash. An example of this is connecting to the
            // server when webpack is bundling
            proxy.on('error', () => {
                console.log('Could not connect to proxy, please try again...');
            });

        }

        app.set('view engine', 'ejs');

        app.use(expressLayouts);

        // use body parser so we can get info from POST and/or URL parameters
        app.use(bodyParser.urlencoded({extended: false}));

        app.use(bodyParser.json());

        this.listening = app.listen(port, () => {
            console.log('Server running on port ' + port);
        });
    }
}

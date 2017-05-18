let chai = require('chai');
chai.use(require('chai-http'));
chai.should();

import { Server } from '../server/server';
let server = new Server();

describe('Pages rendering', () => {

    before((done) => {
        server.init();
        done();
    });

    it('it should render home page', (done) => {
        chai.request(server.express)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            done()
        });
    });

    it('it should render about page', (done) => {
        chai.request(server.express)
        .get('/about')
        .end((err, res) => {
            res.should.have.status(200);
            done()
        });
    });

    it('it should render contacts page', (done) => {
        chai.request(server.express)
        .get('/contacts')
        .end((err, res) => {
            res.should.have.status(200);
            done()
        });
    });

    it('it should render 404 page', (done) => {
        chai.request(server.express)
        .get('/something')
        .end((err, res) => {
            res.should.have.status(404);
            done()
        });
    });

});

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const routes = require("../routes/routes.js");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
routes(app);

chai.use(chaiHttp);

describe('api msg', function () {
    it('should be the base healthcheck', function (done) {
        chai.request(app)
            .get('/api')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.a('object');
                res.text.should.equal('Health Check Api');
                done();
            });
    });

    it('should respond url params with GET', function (done) {
        chai.request(app)
            .get('/api/Message%20test')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.a('object');
                res.text.should.equal('Message test');
                done();
            });
    });

    it('should respond body with POST', function (done) {
        chai.request(app)
            .post('/api')
            .send({'msg': 'Message test'})
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.a('object');
                res.text.should.equal('Message test');
                done();
            });
    });

    it('should not respond with bad URL', function (done) {
        chai.request(app)
            .get('/apixxxx')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            });
    });
});

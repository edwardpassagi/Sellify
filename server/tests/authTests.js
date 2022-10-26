/**
 * This script is responsible for unit testing our authentication API listed on
 * controllers/auth.js
 */

import { Constants } from '../constants.js';
import {expect} from 'chai';
import request from 'supertest';
import express from 'express';
import router from '../routes/routes.js';
import mongoUtil from '../utils/database.js';
import deleteUser from '../controllers/userDelete.js';

// since we're testing our router, we can recreate the server for
// testing purposes here
function createServer() {
    var app = express();
    app.use(router);
    return app;
}

describe('Sellify server', function() {
    var app;
    var server;
    
    before(function(done) {
        mongoUtil.connectToServer( function (err, client) {
            app = createServer();
            server =app.listen(function(err) {
                if (err) {return done(err);}
                done();
            })
        })
    })
    
    it('should return page not found', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(Constants.responseHTTP.badRequest, function (err, res) {
                if (err) return done(err);
                expect(res.body.error).to.equal(
                    Constants.responseMsg.pageNotFound
                );
                // done
                done();
            });
    })

    describe('Signup, Login, and isAuth endpoints', function() {
        var _username = "testAccount";
        var _invalidUser = "dontUseThisUsername";
        var _loginToken;
        before(function(done) {
            deleteUser(_invalidUser);
            done();
        })

        it('fails when username is not provided', function(done) {
            const payload = {
                password: "password",
                name: "test account"
            }
            request(app)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(payload))
                .expect(Constants.responseHTTP.badRequest, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.nullUsername
                    )
                    done();
                })
        });
        
        it('fails when password is not provided', function(done) {
            const payload = {
                username: _username,
                name: "test account"
            }
            request(app)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(payload))
                .expect(Constants.responseHTTP.badRequest, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.nullPassword
                    )
                    done();
                })
        });

        it('fails when name is not provided', function(done) {
            const payload = {
                username: _username,
                password: "password",
            }
            request(app)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(payload))
                .expect(Constants.responseHTTP.badRequest, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.nullName
                    )
                    done();
                })
        });

        it('creates a new account', function(done) {
            const payload = {
                username: _username,
                password: "password",
                name: "test account"
            }
            request(app)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(payload))
                .expect(Constants.responseHTTP.success, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.signUpSuccesful
                    )
                    done();
                })
        });

        it('prevents duplicated account', function(done) {
            const payload = {
                username: _username,
                password: "password",
                name: "test account"
            }
            request(app)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(payload))
                .expect(Constants.responseHTTP.conflict, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.duplicateUsername
                    )
                    done();
                })
        });

        it('checks for nonexistent user on login', function(done) {
            const payload = {
                username: _invalidUser,
                password: "password",
            }
            request(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(payload))
                .expect(Constants.responseHTTP.notFound, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.userNotFound
                    )
                    done();
                })
        })

        it('checks for wrong password', function(done) {
            const payload = {
                username: _username,
                password: "wrongPassword",
            }
            request(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(payload))
                .expect(Constants.responseHTTP.unaothorized, function (err, res)
                {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.userWrongPassword
                    );
                    done();
                })
        })

        it('logs in with correct credentials', function(done) {
            const payload = {
                username: _username,
                password: "password",
            }
            request(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(payload))
                .expect(Constants.responseHTTP.success, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.userLoggedIn
                    );
                    // ensures user got the jwt token
                    expect(res.body.token.length).to.be.greaterThan(0);
                    _loginToken = res.body.token;
                    done();
                })
        })

        it('prevents access without Authorization', function(done) {
            request(app)
                .get('/private')
                .expect(Constants.responseHTTP.unaothorized, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.notAuthenticated
                    );
                    done();
                })
        })

        it('loads private resources when logged in', function(done) {
            const authorizationStr = "Bearer " + _loginToken;
            request(app)
                .get('/private')
                .set('Authorization', authorizationStr)
                .expect(Constants.responseHTTP.success, function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal(
                        Constants.responseMsg.authorizedMessage
                    );
                    done();
                })
        })

        it('prevents access on invalid jwt token', function(done) {
            const authorizationStr = "Bearer " + _loginToken + "a";
            request(app)
                .get('/private')
                .set('Authorization', authorizationStr)
                .expect(Constants.responseHTTP.internalServerError, function (err, res) {
                    if (err) return done(err);
                    done();
                })
        })
        
        after(function(done) {
            deleteUser(_username);
            done();
        })
    })

    after(function(done) {
        server.close(done);
    })
})
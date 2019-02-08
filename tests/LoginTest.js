import { describe, it, before, after } from 'mocha';
import chai, { expect } from 'chai';
import request from 'supertest';
import chaiHttp from 'chai-http';
import db from '../src/db';

import app from '../index';

chai.use(chaiHttp);
chai.should();

// loginTest
describe('POST Requests', async () => {
  before(async () => {
    await db.query('DROP TABLE IF EXISTS users CASCADE');
  });
  describe('POST /api/v1/auth/login', async () => {
    it('should sign in a user', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'testfname',
          otherNames: 'testothernames',
          lastName: 'testlastname',
          email: 'testemail@test.com',
          password: 'password',
          phoneNumber: ' 08765432134',
          passportURL: '',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');

          if (err) { return done(err); }
          done();
        });
    });
  });
});

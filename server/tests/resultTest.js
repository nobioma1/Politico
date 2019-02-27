import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import request from 'supertest';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const testEmail = 'testemail@test.com';
const testJwt = jwt.sign(
  { userId: 1, userEmail: testEmail, isAdmin: true },
  process.env.SECRET,
  { expiresIn: '24h' },
);

describe('Vote Result Test', () => {
  // Vote Result Test
  it('Vote Result', (done) => {
    request(app)
      .get('/api/v1/offices/1/result')
      .set('x-access-token', testJwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].office).to.equal(1);
        expect(res.body.data[0].candidate).to.equal(1);
        expect(res.body.data[0].count).to.equal('1');

        if (err) { return done(err); }
        done();
      });
  });
});

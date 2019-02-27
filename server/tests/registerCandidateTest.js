import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import request from 'supertest';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import app from '../index';

dotenv.config();

chai.use(chaiHttp);
chai.should();

const testEmail = 'testemail@test.com';
const testJwt = jwt.sign(
  { userId: 1, userEmail: testEmail, isAdmin: true },
  process.env.SECRET,
  { expiresIn: '24h' },
);

describe('Register Candidate Test', () => {
  // Create New Party Test
  it('Should Register Candidate', (done) => {
    request(app)
      .post('/api/v1/offices/register')
      .set('x-access-token', testJwt)
      .send({
        office_id: '1',
        candidate_id: '1',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.office).to.equal(1);
        expect(res.body.data.user).to.equal(1);

        if (err) { return done(err); }
        done();
      });
  });
});

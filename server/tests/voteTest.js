import { describe, it, after } from 'mocha';
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

describe('Vote Candidate Test', () => {
  // Vote Candidate Test
  it('Should Vote Candidate', (done) => {
    request(app)
      .post('/api/v1/vote')
      .set('x-access-token', testJwt)
      .send({
        office: '1',
        candidate: '1',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.voter).to.equal(1);
        expect(res.body.data.candidate).to.equal(1);

        if (err) { return done(err); }
        done();
      });
  });

  it('Should Not Vote Candidate, Validate Input', (done) => {
    request(app)
      .post('/api/v1/vote')
      .set('x-access-token', testJwt)
      .send({})
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');

        if (err) { return done(err); }
        done();
      });
  });

  it('User should not vote Twice', (done) => {
    request(app)
      .post('/api/v1/vote')
      .set('x-access-token', testJwt)
      .send({
        office: '1',
        candidate: '1',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.error).to.equal('You have voted for this office');

        if (err) { return done(err); }
        done();
      });
  });

  // View Votes by User
  it('Should View Votes By User', (done) => {
    request(app)
      .get('/api/v1/voted/1')
      .set('x-access-token', testJwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.equal(1);

        if (err) { return done(err); }
        done();
      });
  });
});

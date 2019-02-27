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

describe('Office Test', () => {
  // Create New Office Test
  it('Should Create a New Office', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('x-access-token', testJwt)
      .send({
        type: 'Test Office Type',
        name: 'Test Office Name',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].type).to.equal('Test Office Type');
        expect(res.body.data[0].name).to.equal('Test Office Name');

        if (err) { return done(err); }
        done();
      });
  });

  it('Should Not Create a New Office, Validating Input', (done) => {
    request(app)
      .post('/api/v1/offices')
      .set('x-access-token', testJwt)
      .send({})
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);

        if (err) { return done(err); }
        done();
      });
  });

  // Get An Existing Office Test
  it('Should Get An Existing Office', (done) => {
    request(app)
      .get('/api/v1/offices/1')
      .set('x-access-token', testJwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].type).to.equal('Test Office Type');
        expect(res.body.data[0].name).to.equal('Test Office Name');

        if (err) { return done(err); }
        done();
      });
  });

  // Get All Existing Party Test
  it('Should Get All Existing Party', (done) => {
    request(app)
      .get('/api/v1/offices')
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

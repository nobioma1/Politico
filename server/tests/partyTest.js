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

describe('Party Test', () => {
  // Create New Party Test
  it('Should Create a New Party', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('x-access-token', testJwt)
      .send({
        name: 'Test Party',
        hqAddress: 'Test Address',
        logoUrl: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].name).to.equal('Test Party');
        expect(res.body.data[0].hqaddress).to.equal('Test Address');

        if (err) { return done(err); }
        done();
      });
  });

  // Create Another New Party Test
  it('Should Create Another New Party', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('x-access-token', testJwt)
      .send({
        name: 'Another Test Party',
        hqAddress: 'Another Test Address',
        logoUrl: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].name).not.equal('Test Party');
        expect(res.body.data[0].hqaddress).not.equal('Test Address');

        if (err) { return done(err); }
        done();
      });
  });

  // Create Party Passing empty values
  it('Should Not Create a New Party, Validating Input', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('x-access-token', testJwt)
      .send({
        name: '',
        hqAddress: '',
        logoUrl: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);

        if (err) { return done(err); }
        done();
      });
  });

  // Create Duplicate Party Test
  it('Should Not Create a Duplicate Party', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('x-access-token', testJwt)
      .send({
        name: 'Test Party',
        hqAddress: 'Test Address',
        logoUrl: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal("Party with 'Test Party' already exists");

        if (err) { return done(err); }
        done();
      });
  });

  // Edit Existing Party Test
  it('Should Edit Existing Party', (done) => {
    request(app)
      .put('/api/v1/parties/1')
      .set('x-access-token', testJwt)
      .send({
        name: 'Edit Test Party',
        hqAddress: 'Edit Test Address',
        logoUrl: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].name).to.equal('Edit Test Party');
        expect(res.body.data[0].hqaddress).to.equal('Edit Test Address');

        if (err) { return done(err); }
        done();
      });
  });

  // Get An Existing Party Test
  it('Should Get An Existing Party', (done) => {
    request(app)
      .get('/api/v1/parties/1')
      .set('x-access-token', testJwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].name).to.equal('Edit Test Party');
        expect(res.body.data[0].hqaddress).to.equal('Edit Test Address');

        if (err) { return done(err); }
        done();
      });
  });

  // Get All Existing Party Test
  it('Should Get All Existing Party', (done) => {
    request(app)
      .get('/api/v1/parties')
      .set('x-access-token', testJwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.equal(2);

        if (err) { return done(err); }
        done();
      });
  });

  // Delete An Existing Party Test
  it('Should Delete An Existing Party', (done) => {
    request(app)
      .delete('/api/v1/parties/2')
      .set('x-access-token', testJwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        expect(res.body).to.be.an('object');

        if (err) { return done(err); }
        done();
      });
  });

  // Performing a function without passing JWT
  it('Performing and Admin Priviledged Function IF not Admin', (done) => {
    request(app)
      .post('/api/v1/parties')
      .set('x-access-token', jwt.sign(
        { userId: 1, userEmail: testEmail, isAdmin: false },
        process.env.SECRET,
        { expiresIn: '24h' },
      ))
      .send({
        name: 'Test Party not Admin',
        hqAddress: 'Test Address not Admin',
        logoUrl: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.error).to.equal('Unauthorized');

        if (err) { return done(err); }
        done();
      });
  });
});

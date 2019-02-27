import { describe, it, before } from 'mocha';
import chai, { expect } from 'chai';
import request from 'supertest';
import chaiHttp from 'chai-http';
import db from '../src/db';
import schema from '../src/db/schema';

import app from '../index';

chai.use(chaiHttp);
chai.should();

const testUser = {
  firstName: 'testfname',
  lastName: 'testlastname',
  email: 'testemail@test.com',
  password: 'password',
  phoneNumber: ' 08765432134',
  passportURL: '',
};

describe('Authentication', () => {
  before(async () => {
    await db.query(schema.droptables);
    await db.query(`${schema.partiesTable}; ${schema.officesTable}; ${schema.usersTable};
    ${schema.candidatesTable}; ${schema.voteTable}`);
  });
  
  // Signup Test
  it('Should Create a User Account', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(testUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].user).to.be.an('object');
        expect(res.body.data[0].user.user_id).to.equal(1);
        expect(res.body.data[0].user.firstname).to.equal('testfname');
        expect(res.body.data[0].user.lastname).to.equal('testlastname');
        expect(res.body.data[0].user.email).to.equal('testemail@test.com');
        expect(res.body.data[0].user.phonenumber).to.equal('08765432134');
        expect(res.body.data[0].user.passporturl).to.equal('');
        expect(res.body.data[0].user.isadmin).to.equal(false);

        if (err) { return done(err); }
        done();
      });
  });

  it('Should Not Create A New User Account, Email is Unique', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(testUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal("User with 'testemail@test.com' already exists");

        if (err) { return done(err); }
        done();
      });
  });

  it('Should Not Create A New User Account, Validating Input', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({})
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        if (err) { return done(err); }
        done();
      });
  });

  // Login Test
  it('Should Login User', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'testemail@test.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.body.data[0].user).to.be.an('object');
        expect(res.body.data[0].user.user_id).to.equal(1);
        expect(res.body.data[0].user.firstname).to.equal('testfname');
        expect(res.body.data[0].user.lastname).to.equal('testlastname');
        expect(res.body.data[0].user.email).to.equal('testemail@test.com');
        expect(res.body.data[0].user.phonenumber).to.equal('08765432134');
        expect(res.body.data[0].user.passporturl).to.equal('');
        expect(res.body.data[0].user.isAdmin).to.equal(false);


        if (err) { return done(err); }
        done();
      });
  });

  it('Should Not Login Non-Existing User', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'testemail2@test.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Invalid User Credentials');

        if (err) { return done(err); }
        done();
      });
  });

  it('Should Not Login User with Wrong Password', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'testemail2@test.com',
        password: 'wrongpassword',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Invalid User Credentials');

        if (err) { return done(err); }
        done();
      });
  });
});

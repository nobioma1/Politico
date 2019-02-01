import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import parties from "../models/parties";


chai.use(chaiHttp);
chai.should();

describe('TESTING POLITICO ALL ENDPOINTS', () => {
  // Test For Party
  describe('-TESTING PARTIES ENDPOINTS', () => {
    // Test to get all parties
    it('should GET all parties', (done) => {
      chai
        .request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
    // Test to get a party
    it('should GET only one party', (done) => {
      const id = parties.length;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          done();
        });
    });
    // Test to create a party
    it('should CREATE a Party', (done) => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .send({
          name: 'All Testing Party',
          hqAddress: 'Testing The Streets Unit',
          logoUrl: 'testing.jpg',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(201);
          res.body.should.have.property('data');
          res.body.data[0].should.be.a('object');
          res.body.data[0].name.should.equal('All Testing Party');
          res.body.data[0].hqAddress.should.equal('Testing The Streets Unit');
          res.body.data[0].logoUrl.should.equal('testing.jpg');
          done();
        });
    });
    // Test to edit a party
    it('should EDIT a Party', (done) => {
      const id = parties.length;
      chai.request(app)
        .put(`/api/v1/parties/${id}`)
        .send({
          name: 'All Testing Party Edited',
          hqAddress: 'Testing The Streets Unit Edited',
          logoUrl: 'testing.jpg Edited',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(200);
          res.body.should.have.property('data');
          res.body.data[0].should.be.a('object');
          res.body.data[0].name.should.equal('All Testing Party Edited');
          res.body.data[0].hqAddress.should.equal('Testing The Streets Unit Edited');
          res.body.data[0].logoUrl.should.equal('testing.jpg Edited');
          done();
        });
    });
    // Test to DELETE a party
    it('should DELETE one party', (done) => {
      const id = parties.length;
      chai.request(app)
        .delete(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      // confirm delete was complete
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });
});

// TEST FOR POLITICAL OFFICES
describe('-TESTING POLITICAL OFFICES ENDPOINTS', () => {
  // Test to create office
  it('should CREATE a new office', (done) => {
    chai
      .request(app)
      .post('/api/v1/offices')
      .send({
        type: 'Test type',
        name: 'Test President',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(201);
        res.body.should.have.property('data');
        res.body.data[0].should.be.a('object');
        res.body.data[0].type.should.equal('Test type');
        res.body.data[0].name.should.equal('Test President');
        done();
      });
  });
});

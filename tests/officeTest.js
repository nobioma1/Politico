import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import offices from '../src/models/offices';

chai.use(chaiHttp);
chai.should();

// TEST FOR POLITICAL OFFICES
describe('-TESTING POLITICAL OFFICES ENDPOINTS', () => {
  // Test to get all offices
  it('should GET all offices', (done) => {
    chai
      .request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(offices.length);
        done();
      });
  });
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
  // Test to get a office
  it('should GET only one office', (done) => {
    const id = offices.length;
    chai
      .request(app)
      .get(`/api/v1/offices/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data[0].should.be.a('object');
        res.body.data[0].type.should.equal('Test type');
        res.body.data[0].name.should.equal('Test President');
        done();
      });
  });
});

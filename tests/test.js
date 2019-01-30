import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Party', () => {
  describe('GET /api/v1/parties', () => {
    // Test to get all parties
    it('should get all parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

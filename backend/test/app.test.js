// test/app.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Replace with the path to your Express app file.

// Configure chai with chai-http
chai.use(chaiHttp);

const expect = chai.expect;

describe('API Tests', () => {
  it('should return status 200 and a welcome message', (done) => {
    chai
      .request(app)
      .get('/dailyBibleChapter')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Add more tests for other endpoints as needed
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

const { expect, request } = chai;

describe('index page', function() {
  describe('when no query parameter passed', function() {
    it('returns a 400', async function() {
      const response = await request(server).get('/');

      expect(response.status).to.equal(400);
    });
  });

  describe('when query parameters are passed', function() {
    const validParams = {
      i: '0123abc-456',
      t: 'Something',
      d: 'Goes here',
      url: 'http://example.com'
    };

    it('returns a valid html page', async function() {
      const response = await request(server)
            .get('/')
            .query(validParams);

      expect(response.status).to.equal(200);
      expect(response.text).to.have.string('<html>');
      expect(response.text).to.have.string(`<img src="https://ar-share.micpn.com/uploaded/0123abc-456.jpg" style=`);
    });

    it('does not allow xss', async function() {
      const response = await request(server)
            .get('/')
            .query(Object.assign({}, validParams, {
              d: `"/><script>alert('hi')</script>`
            }));

      expect(response.text).to.have.string(`&quot;/&gt;&lt;script&gt;alert(&#39;hi&#39;)&lt;/script&gt;`);
    });

    it('validates i param', async function() {
      const response = await request(server)
            .get('/')
            .query(Object.assign({}, validParams, {
              i: 'foobar'
            }));

      expect(response.status).to.equal(400);
    });
  });
});

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // adjust path to your app.js

describe('Express App Tests', () => {
  it('should return 200 on GET / and contain "GFG Game"', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('GFG Game');
  });

  it('should serve static file game.js and contain "const canvas"', async () => {
    const res = await request(app).get('/static/game.js');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('const canvas');
  });
});

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


jest.mock('../lib/services/github');



describe('oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
    
  });
  it('should login in and redirect user to dash board', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: '100@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),

    });
  });
    
  it('#Delete should delete a users cookies', async () => {
    const res = await request.agent(app)
      .delete('/api/v1/github/sessions');
    expect(res.body).toEqual({
      success: true,
      message: 'signed out'
    });
  });
    
    


  afterAll(() => {
    pool.end();
  });






});

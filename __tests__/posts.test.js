const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');
const agent = request.agent(app);




describe('oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });



  afterAll(() => {
    pool.end();
  });
  
  
  it('auth users can view list of post', async () => {
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    const res = await agent.get('/api/v1/posts');
    expect(res.status).toBe(200),
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      title: expect.any(String),
      description: expect.any(String)
    });
  });
  
  
  it('auth users submit a a new Post', async () => {
    const newPost = {
      title: 'All your bases belong to us',
      description: 'No they dont',
    };
    const res = await agent.post('/api/v1/posts').send(newPost);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      created_at: expect.any(String),
      ...newPost
    });


    
  });
});

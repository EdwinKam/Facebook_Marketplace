const supertest = require('supertest');
const http = require('http');
const db = require('./db');
const app = require('../app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('GET all Users', async () => {
  await request.get('/v0/users')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
    });
});

test('GET John Doe', async () => {
  const email = encodeURIComponent('johndoe@gmail.com');
  await request.get('/v0/users/' + email)
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.member.email).toEqual(decodeURIComponent(email));
    });
});

const postUser = {
  'name': {
    'first': 'Cow',
    'last': 'Level',
  },
  'email': 'thereisnocowlevel@example.com',
  'password': 'password',
};

test('Post a User', async () => {
  await request.post('/v0/users')
    .send(postUser)
    .expect(201);
});

test('Post a User that already exists', async () => {
  await request.post('/v0/users')
    .send(postUser)
    .expect(409);
});


const authTestBody = {
  'email': 'JohnDoe@gmail.com',
  'password': 'passworddoe',
};

test('Authentication test Success', async () => {
  await request.post('/authenticate')
    .send(authTestBody)
    .expect(201);
});


const badUserAuthTestBody = {
  'email': 'JohnDoEEEe@gmail.com',
  'password': 'passworddoe',
};

test('Authentication FAIL USER', async () => {
  await request.post('/authenticate')
    .send(badUserAuthTestBody)
    .expect(401);
});

const badPassAuthTestBody = {
  'email': 'JohnDoe@gmail.com',
  'password': 'passworddoeEEE',
};

test('Authentication test FAIL PASSWORD', async () => {
  await request.post('/authenticate')
    .send(badPassAuthTestBody)
    .expect(401);
});

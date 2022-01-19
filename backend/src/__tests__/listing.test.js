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

test('GET all listing 200 without testing content', async () => {
  await request.get('/v0/listings?category=all&condition=all&delivery=all')
    .expect(200);
});

// right now we only have 16 lists
test('GET all listing length', async () => {
  await request.get('/v0/listings?category=all&condition=all&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(16);
    });
});

// right now we only have 16 lists
test('GET all listing length', async () => {
  await request.get('/v0/listings?category=all&condition=all&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(16);
    });
});

test('GET all apparel listing length', async () => {
  await request.get('/v0/listings?category=apparel&condition=all&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(6);
    });
});

test('GET all new listing length', async () => {
  await request.get('/v0/listings?category=all&condition=new&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(7);
    });
});

test('GET all local pick up listing length', async () => {
  await request.get(
    '/v0/listings?category=all&condition=all&delivery=local%20pickup')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(8);
    });
});

test('GET all shipping listing length', async () => {
  await request.get(
    '/v0/listings?category=all&condition=all&delivery=local%20pickup')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(8);
    });
});

test('GET all electronics listing length', async () => {
  await request.get(
    '/v0/listings?category=electronics&condition=all&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(10);
    });
});

test('GET all cell phone listing length', async () => {
  await request.get(
    '/v0/listings?category=cell%20phones&condition=all&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(8);
    });
});

test('GET condition=all listing length', async () => {
  await request.get(
    '/v0/listings?category=cell%20phones&condition=all&delivery=shipping')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(4);
    });
});

test('GET delivery=all listing length', async () => {
  await request.get(
    '/v0/listings?category=cell%20phones&condition=new&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(3);
    });
});

test('GET everything filtered listing length', async () => {
  await request.get(
    '/v0/listings?category=iphone&condition=new&delivery=shipping')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(1);
    });
});

test('GET only product name define', async () => {
  await request.get(
    '/v0/listings?productName=iphone&'+
      'category=all&condition=all&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(5);
    });
});

test('GET only delivery and condition define', async () => {
  await request.get('/v0/listings?category=all&'+
    'condition=used&delivery=shipping')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(6);
    });
});

test('GET seach iphone in electronics', async () => {
  await request.get('/v0/listings?productName=iphone&'+
    'category=electronics&condition=all&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(4);
    });
});

test('GET search used iphone in electronics', async () => {
  await request.get('/v0/listings?productName=iphone'+
    '&category=electronics&condition=used&delivery=all')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(2);
    });
});

test('GET search used shipping iphone in electronics', async () => {
  await request.get('/v0/listings?productName=iphone'+
    '&category=electronics&condition=used&delivery=shipping')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(1);
    });
});

test('GET search used pickup iphone in electronics', async () => {
  await request.get('/v0/listings?productName=iphone'+
    '&category=electronics&condition=used&delivery=local%20pickup')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(1);
    });
});

test('before insert test', async () => {
  await request.get('/v0/listings?productName=xyz'+
    '&category=men&condition=new&delivery=shipping')
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(0);
    });
});

const newlist1 = {
  'user': 'c8ddb501-dd12-4cbc-8cd7-b630f10020ea',
  'category': 'men',
  'listing': {
    'name': 'xyz short',
    'price': '$3.5',
    'pic': [
      'string',
    ],
    'condition': 'new',
    'delivery': 'shipping',
    'description': 'idk',
    'responses': [],
  },
};

const authTestBody = {
  'email': 'JohnDoe@gmail.com',
  'password': 'passworddoe',
};

/* // AUTHENTICATION EXAMPLE
test('Authentication test Success', async () => {
  await request.post('/authenticate')
    .send(authTestBody)
    .expect(201);
});
*/

let newid;
test('post new list xyz short', async () => {
  let authToken;
  await request.post('/authenticate')
    .send(authTestBody)
    .expect(201)
    .then( (data) =>{
      // console.log(data.body);
      authToken = data.body.accessToken;
    });

  console.log(authToken);

  await request.post('/v0/listings/')
    .send(newlist1)
    .set('Authorization', `Bearer ${authToken}`)
    .set('Content-type', 'application/json; charset=UTF-8')
    .expect(201);
});


test('get new list xyz short with no condition', async () => {
  await request.get('/v0/listings?productName'+
    '=xyz&category=all&condition=all&delivery=all')
    .send(newlist1)
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(1);
    });
});


test('get new list xyz short with category men', async () => {
  // men only has 2 list before post
  await request.get('/v0/listings?category=men&'+
    'condition=new&delivery=all')
    .send(newlist1)
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(2);
    });
});


test('get new list xyz short with category men and new', async () => {
  await request.get('/v0/listings?productName='+
    'xyz&category=men&condition=new&delivery=all')
    .send(newlist1)
    .expect(200)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toEqual(1);
    });
});


test('get new list xyz short with category men and new and shipping',
  async () => {
    await request.get('/v0/listings?productName'+
    '=xyz&category=men&condition=new&delivery=shipping')
      .send(newlist1)
      .expect(200)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body.length).toEqual(1);
        // console.log(data.body[0].id);
        newid = data.body[0].id;
      });
  });


test('get basic empty comment',
  async () => {
    await request.get('/v0/comments/'+newid)
      .expect(200)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body.length).toEqual(0);
      });
  });


test('get non-exisit post\'s comment',
  async () => {
    await request.get('/v0/comments/3fa85f64-5717-4562-b3fc-2c963f66afa6')
      .expect(404);
  });


test('put basic comment to xyz',
  async () => {
    await request.put('/v0/comments/'+newid+'?user=alex&comment=whatsup')
      .expect(204);
  });


test('put second comments to xyz',
  async () => {
    await request.put('/v0/comments/'+newid+'?user=alex&comment=second')
      .expect(204);
  });

test('put comments to non exist post id ',
  async () => {
    await request.put('/v0/comments/'+
    '00e9aaad-c3ac-4366-a594-98d2a2f05e86?user=alex&comment=second')
      .expect(404);
  });


test('put comments to invalid post id ',
  async () => {
    await request.put('/v0/comments/00invalid86?user=alex&comment=second')
      .expect(400);
  });


test('get user posts',
  async () => {
    await request.get('/v0/userposts/00e9aaad-c3ac-4366-a594-98d2a2f05e86')
      .expect(200)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data.body).toBeDefined();
        expect(data.body.firstName).toBeDefined();
        expect(data.body.lastName).toBeDefined();
        expect(data.body.email).toBeDefined();
        expect(data.body.posts).toBeDefined();
        expect(data.body.posts.length).toEqual(4);
      });
  });


test('get invalid user posts',
  async () => {
    await request.get('/v0/userposts/0invalid86')
      .expect(404);
  });


test('get nonexist user posts',
  async () => {
    await request.get('/v0/userposts/00e9aaad-c3ac-4366-a594-98d2a3f05e86')
      .expect(404);
  });


test('find all category',
  async () => {
    await request.get('/v0/category')
      .expect(200);
  });

test('get invlid post\'s id comment',
  async () => {
    await request.get('/v0/comments/3fa863f66afa6')
      .expect(404);
  });

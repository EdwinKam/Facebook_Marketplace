const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dummy = require('./dummy');
// Our custom modules start here

// Authentication module
const auth = require('./auth');

// Users module
const users = require('./users');

// listing module
const list = require('./listing');

// category module
const category = require('./category');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

// our Authentication code
app.post('/authenticate', auth.authenticate);

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.get('/v0/dummy', dummy.get);
// Your routes go here./
// listing endpoints
app.get('/v0/listings', list.get); // listing with categories and filter.
app.post('/v0/listings', auth.check, list.post); // post a listing
app.get('/v0/comments/:id', list.viewComment);
app.put('/v0/comments/:id', list.addComment);
app.get('/v0/userposts/:id', list.getPostsByUserId);
// category endpoints
app.get('/v0/category', category.get); // post a listing
// app.get('/v0/search', list.search); // search listing with keyword

// Users endpoints
app.get('/v0/users', users.getAll);
app.get('/v0/users/:email', users.getByEmail);
app.post('/v0/users', users.post);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;

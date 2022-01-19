const {Pool} = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// This file holds our hash key
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const secrets = require('./secrets.json');

exports.authenticate = async (req, res) => {
  // Grabs the email and password from body
  const email = (req.body.email).toLowerCase();
  const password = req.body.password;

  // console.log(email);
  // console.log(password);

  // Finds the user from the retrieved user data. Writing direct query code.
  const select = `SELECT * FROM users WHERE (member)->>'email' = $1`;
  const query = {
    text: select,
    values: [email],
  };
  const {rows} = await pool.query(query);

  if (rows.length === 0) {
    res.status(401).send('Username or password incorrect');
    return;
  }

  // Gets the user data (should only be one since emails are unique)
  const user = rows[0];

  const result = bcrypt.compareSync(password, user.member.password);
  // Username and password matches
  if (result == true) {
    const accessToken = jwt.sign(
      {email: user.member.email},
      secrets.accessToken,
      {
        expiresIn: '60m',
        algorithm: 'HS256',
      });
    // Returns the user's full name and the JWT
    res.status(201).json({
      name: user.member.name.first +' '+ user.member.name.last,
      id: user.id,
      accessToken: accessToken,
    });
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

// Used to check to see if the authentication is there.
exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // if (authHeader) {
  const token = authHeader.split(' ')[1];
  // console.log(token);
  // console.log(secrets.accessToken);
  jwt.verify(token, secrets.accessToken, (err, user) => {
    /*
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
    */
    req.user = user;
    next();
  });
  // } else {
  // res.sendStatus(401);
  // }
};

const {Pool} = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getAll = async (req, res) =>{
  const select = `SELECT * FROM users`;
  const {rows} = await pool.query(select);

  res.status(200).json(rows);
};

exports.getByEmail = async (req, res) =>{
  const email = decodeURIComponent(req.params.email).toLowerCase();
  // console.log(email);
  const select = `SELECT * FROM users WHERE (member)->>'email' = $1`;
  const query = {
    text: select,
    values: [email],
  };
  // console.log(query);
  const {rows} = await pool.query(query);
  // console.log(rows);
  res.status(200).json(rows[0]);
};

exports.post = async (req, res) =>{
  // console.log('USERS.POST');
  // console.log(decodeURIComponent(req.body.email));

  // Checks to see if the user email already exists
  const check = `SELECT * FROM users WHERE (member)->>'email' = $1`;
  const queryCheck = {
    text: check,
    values: [decodeURIComponent(req.body.email).toLowerCase()],
  };
  const {rows} = await pool.query(queryCheck);

  // Rows would be a non zero value if an email already exist in database
  if (rows.length != 0) {
    // console.log('this email already exists!');
    res.status(409).send('Email already exists');
    return;
  }

  // If the user email doesn't exist, insert it into the database.
  const insert = `INSERT INTO users (member) `+
    `VALUES ($1) RETURNING (member)->>'email'`;

  // Hashes the password and assigns it to hashedPass
  let hashedPass = '';
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    hashedPass = hash;
    // console.log(hashedPass);
    // The body to POST
    const member = {
      'name': {
        'first': req.body.name.first,
        'last': req.body.name.last,
      },
      'email': (req.body.email).toLowerCase(),
      'password': hashedPass,
    };

    const query = {
      text: insert,
      values: [member],
    };
    // Incase we want to return the user as well
    // const newUser =
    await pool.query(query);
    // console.log(newUser);

    // Sends the response code
    res.status(201).send();
  });
};

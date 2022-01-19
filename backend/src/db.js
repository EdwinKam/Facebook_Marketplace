const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectPostById = async (id) => {
  console.log('called'+id);
  let select = 'SELECT id, listing FROM listing';
  select += ` WHERE id=$1`;
  const query = {
    text: select,
    values: [id],
  };

  try {
    const {rows} = await pool.query(query);
    if (rows.length===1) {
      console.log(rows);
      return rows[0];
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

exports.updateComment = async (id, username, comment) => {
  let select = 'SELECT listing->>\'responses\' AS response FROM listing';
  select += ` WHERE id=$1`;
  const query = {
    text: select,
    values: [id],
  };

  try {
    const {rows} = await pool.query(query);
    if (rows.length===1) {
      let responseArrayStr = rows[0].response;
      if (responseArrayStr.length>2) {
        responseArrayStr = replaceLastChar(responseArrayStr, ',');
      } else {
        responseArrayStr = replaceLastChar(responseArrayStr, '');
      }
      responseArrayStr += ` {"user": "${username}", "comment": "${comment}"}]`;
      // console.log(responseArrayStr);
      const update = `UPDATE listing SET listing = JSONB_SET(listing, `+
            `'{responses}','`+responseArrayStr+
            `', true) WHERE id=$1 RETURNING id`;
      const updateQuery = {
        text: update,
        values: [id],
      };
      await pool.query(updateQuery);
      return 204;
    }
    return 404;
  } catch (err) {
    console.log(err);
    return 400;
  }
};

exports.getPostsByUserId = async (userId) => {
  let findUserQuery = 'SELECT member FROM users';
  findUserQuery += ` WHERE id=$1`;
  const findUser = {
    text: findUserQuery,
    values: [userId],
  };

  try {
    const {rows: users} = await pool.query(findUser);
    if (users.length===1) {
      const user = users[0].member;
      console.log(user);
      // return this obj with the user data, along with posts
      const obj = {
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        posts: [],
      };
      // fill out the post array
      const findPostsQuery = 'SELECT listing FROM listing'+
        ` WHERE u_id=$1`;
      const findPosts = {
        text: findPostsQuery,
        values: [userId],
      };
      const {rows: posts} = await pool.query(findPosts);
      for (const post of posts) {
        obj.posts.push(post);
      }
      return obj;
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

/**
 *
 * @param {string} str
 * @param {string} ch
 * @return {string} replaced string
 */
function replaceLastChar(str, ch) {
  const arr = str.split('');
  arr[str.length-1] = ch;
  return arr.join('');
}

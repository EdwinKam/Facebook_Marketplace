const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
const db = require('./db');

const categories = ['electronics', 'apparel', 'cell phones', 'flash drives',
  'iphone', 'android', 'men', 'women'];

/**
 *
 * @param {array} listingArr
 * @param {array} resultsArr
 */
function fillResults(listingArr, resultsArr) {
  for (const list of listingArr) {
    const temp = {};
    temp.id = list.id;
    temp.category = categories[list.cat_id];
    temp.user = list.u_id;
    temp.listing = list.listing;
    resultsArr.push(temp);
  }
}
/**
 *
 * @param {*} parentCategory
 * @return {string} query
 */
async function getAllSubCategory(parentCategory) {
  let query = ` (cat_id = '${parentCategory[0].id}'`;
  while (parentCategory.length > 0) {
    for (const t of parentCategory) {
      parentCategory.pop();
      const findSubCat = `SELECT id FROM category WHERE p_id = '${t.id}'`;
      query += ` OR cat_id = '${t.id}'`;
      const {rows} = await pool.query(findSubCat);
      for (const row of rows) {
        parentCategory.push(row);
      }
    }
  }
  query+= ')';
  return query;
}

/**
 *
 * @param {*} productName
 * @param {*} category
 * @param {*} condition
 * @param {*} delivery
 * @param {*} results
 */
async function queryWithFilters(productName, category, condition,
  delivery, results) {
  let query = 'SELECT * FROM listing';
  let hasPrevCondition = false;
  if (productName) {
    query += ' WHERE ';
    query += `listing->>'name' ILIKE '%${productName}%'`;
    hasPrevCondition = true;
  }
  if (category!=='all') {
    const findCatId = `SELECT id FROM category 
      WHERE category->>'category' = '${category}'`;
    const {rows: parentCategory} = await pool.query(findCatId);
    query += hasPrevCondition ? ' AND ' : ' WHERE ';
    query += await getAllSubCategory(parentCategory);
    hasPrevCondition = true;
  }
  if (condition!=='all') {
    query += hasPrevCondition ? ' AND ' : ' WHERE ';
    query += `listing->>'condition' = '${condition}'`;
    hasPrevCondition = true;
  }
  if (delivery!=='all') {
    query += hasPrevCondition ? ' AND ' : ' WHERE ';
    query += `listing->>'delivery' = '${delivery}'`;
    hasPrevCondition = true;
  }
  const {rows: listings} = await pool.query(query);
  fillResults(listings, results);
}
exports.post = async (req, res) => {
  const query = `INSERT INTO listing(u_id, cat_id, listing) 
    VALUES ('${req.body.user}',
    '${categories.indexOf(req.body.category)}',
    '${JSON.stringify(req.body.listing)}')`;
  await pool.query(query);
  res.status(201).send();
};

exports.get = async (req, res) => {
  const results = [];
  await queryWithFilters(req.query.productName, req.query.category[0],
    req.query.condition[0], req.query.delivery[0], results);
  res.status(200).json(results);
};

exports.viewComment = async (req, res) => {
  // console.log(req.params.id);
  const post = await db.selectPostById(req.params.id);
  try {
    res.status(200).send(post.listing.responses);
  } catch (err) {
    res.status(404).send();
  }
};

exports.addComment = async (req, res) => {
  const statusCode = await db.updateComment(req.params.id,
    req.query.user,
    req.query.comment);
  res.status(statusCode).send();
};

exports.getPostsByUserId = async (req, res) => {
  const obj = await db.getPostsByUserId(req.params.id);
  res.status(obj ? 200 : 404).send(obj);
};

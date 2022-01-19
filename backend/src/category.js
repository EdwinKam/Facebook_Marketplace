const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

/**
 *
 * @return {array} [{category: name, subcat: [subcat....]}]
 */
async function getAllCategory() {
  const findAllCat = 'SELECT * FROM category';
  const {rows: category} = await pool.query(findAllCat);
  const categoryArray = [];
  for (let i=0; i<category.length; i++) {
    categoryArray.push({subCategory: []});
  }
  category.map((cat)=>{
    categoryArray[cat.id].name = cat.category.category;
    // assume every category has parent
    categoryArray[cat.id].hasParent = true;
    // set the top category has no parent
    // if this category has parent, we add this category to its parent
    // subcategory []
    cat.p_id==-1 ? categoryArray[cat.id].hasParent = false :
      categoryArray[cat.p_id].subCategory.push(cat.category.category);
  });
  // console.log(categoryArray);
  return categoryArray;
}
// exports.post = async (req, res) => {
//   const query = `INSERT INTO listing(u_id, cat_id, listing)
//     VALUES ('${req.body.user}',
//     '${categories.indexOf(req.body.category)}',
//     '${JSON.stringify(req.body.listing)}')`;
//   await pool.query(query);
//   res.status(201).send();
// };

exports.get = async (req, res) => {
  const results = await getAllCategory();
  res.status(200).json(results);
};

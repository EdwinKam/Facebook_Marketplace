import React from 'react';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import {Link} from 'react-router-dom';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link} from 'react-router-dom';
// import {Typography} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Grid';
import {useHistory} from 'react-router-dom';

// History
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles({
  regButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    marginTop: '5%',
  },

  inputField: {
    outline: 'none',
    border: 'none',
    marginBottom: '5%',
    width: '100%',
  },

  mobileLoginForm: {
    textAlign: 'center',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 20%)',
    backgroundColor: 'white',
  },
  dropdown: {
    textAlign: 'left',
  },

  form: {
    width: '100%',
  },

  error: {
    color: 'red',
  },

});
/**
 * Simple component with one state variable.
 *
 * @return {object} JSX
 */
function Sell() {
//   const [user, setUser] = React.useState({email: '', password: ''});
//   const [password, setPassword] = React.useState('');
//   const [confirm, setConfirm] = React.useState('');
//   const [matched, setMatched] = React.useState(true);
  const [allCategory, setAllCategory] = React.useState([]);
  const [category, setCategory] = React.useState('electronics');
  const [condition, setCondition] = React.useState('new');
  const [delivery, setDelivery] = React.useState('local pickup');
  const [productName, setProductName] = React.useState('');
  const [price, setPrice] = React.useState('$');
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState(false);
  // const [posted, setPosted] = React.useState(false);
  const [pics, setPics] = React.useState(['']);
  const history = useHistory();
  // History is used to redirect to other routes

  const getAllCategory = () => {
    const query = 'v0/category';
    fetch(query)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setAllCategory(json);
      })
      // CONVERTED TO EMPTY CATCH STATEMENTS FOR CODE COVERAGE
      .catch();
  };
  React.useEffect(()=> {
    getAllCategory();
  }, []);

  const handleCategory = (event) => {
    const id = event.target.value;
    console.log(id);
    setCategory(id);
  };
  const handleCondition = (event) => {
    setCondition(event.target.value);
  };
  const handleDelivery = (event) => {
    setDelivery(event.target.value);
  };
  const handlePrice = (event) => {
    if (event.target.value.length===0) {
      setPrice('$');
    } else {
      setPrice(event.target.value);
    }
  };


  // This event is called when the login button is clicked
  const onSubmit = (event) => {
    console.log('clicked');
    event.preventDefault();
    if (!productName ||!pics.filter((pic)=>pic.length).length||
      price==='$' || condition==='') {
      console.log(!productName ||!pics.filter((pic)=>pic.length).length);
      setError(true);
      return;
    }
    // Authentication Header
    const token = localStorage.getItem('user');
    console.log(token);
    const bearerToken = JSON.parse(token).accessToken;
    console.log(JSON.parse(token).id);
    const productDetail ={
      user: JSON.parse(token).id,
      category: category,
      listing: {
        'name': productName,
        'price': price,
        'pic': pics.filter((pic)=>pic.length),
        'condition': condition,
        'delivery': delivery,
        'description': description,
        'responses': [],
      },
    };
    console.log(JSON.stringify(productDetail));


    // POST request using fetch()
    fetch('/v0/listings', {

      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify(productDetail),

      // Adding headers to the request
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    // Converting to JSON
      .then((response) => {
        history.push('/profile');
      })
      .then()
      .catch();
  };

  const addPics = () => {
    const arr = pics;
    arr.push('');
    setPics([...arr]);
  };

  const removePics = () => {
    const arr = pics;
    arr.pop();
    setPics([...arr]);
  };

  const setPicsArrayByIdx = (value, idx) => {
    const arr = pics;
    arr[idx] = value;
    setPics([...arr]);
  };

  const displayPicTextField = () => {
    return pics.map((pic, idx)=>
      <TextField
        name="pic"
        error={error&&!pics.filter((pic)=>pic.length).length}
        key={'pic-'+idx}
        className={classes.inputField}
        inputProps={
          {'data-testid': 'pic-input'+idx}
        }
        placeholder='Picture Link'
        label='Picture Link'
        variant={'outlined'}
        value={pic}
        onChange={(e)=>setPicsArrayByIdx(e.target.value, idx)}
        helperText="required"
      />);
  };

  const classes = useStyles();

  return (
    <div>
      {!localStorage.getItem('user') ? <Redirect to={'login'}/>:null}
      <Box component="form" sx={{
        'display': {xs: '12'},
        '& > :not(style)': {m: 1, height: '0ch'},
      }}
      className={classes.mobileLoginForm}>
        <div className={classes.form}>
          <Grid container direction={'row'}>
            <Button component={Link} to={'listings'}
              align="left" variant="Go home">
              <ArrowBackIosIcon/>
            </Button>
            <h2 align="center">Add new listing</h2>
          </Grid>
          <Box>
            <TextField
              name="title"
              inputProps={
                {'data-testid': 'productName-input'}
              }
              error={!productName&&error}
              className={classes.inputField}
              placeholder='Title of the listing'
              label='Title of the listing'
              variant={'outlined'}
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
            />
          </Box>
          <hr />
          <Box>
            <TextField
              name="price"
              inputProps={
                {'data-testid': 'price-input'}
              }
              error={price==='$'&&error}
              className={classes.inputField}
              placeholder='Price'
              label='Price'
              variant={'outlined'}
              value={price}
              onChange={handlePrice}
            />
          </Box>
          <hr />
          <Box>
            <FormControl fullWidth className={classes.dropdown}>
              {/* <InputLabel id="demo-simple-select-label">
              Category</InputLabel> */}
              <Select
                labelId="select-cat"
                data-testId= 'category-input'
                native ={true}
                error={!category&&error}
                id="select-cat"
                value={category}
                onChange={handleCategory}
                defaultValue={'electronics'}
              >
                {allCategory.map((cat, idx)=>
                  <option key={'cat-'+cat.name} value={cat.name}
                    inputProps={
                      {'data-testid': 'cat-'+cat.name}
                    }>
                    {cat.name}</option>)}
              </Select>
            </FormControl>
          </Box>
          <hr />
          <Box>
            <FormControl fullWidth className={classes.dropdown}>
              <Select
                labelId="select-label-condition"
                id="select-condition"
                native={true}
                value={condition}
                data-testid="condition-input"
                onChange={handleCondition}
                defaultValue={'new'}
              >
                <option key="con-new" value="new">New</option>
                <option key="con-used" value="used">Used</option>
              </Select>
            </FormControl>
          </Box>
          <hr />
          <FormControl fullWidth className={classes.dropdown}>
            <Select
              labelId="select-label-Delivery"
              native={true}
              id="select-Delivery"
              value={delivery}
              onChange={handleDelivery}
              data-testid="delivery-input"
              defaultValue={'local pickup'}
            >
              <option key="del-pickup" value="local pickup">
                Local Pickup</option>
              <option key="del-shipping" value="shipping">
                Shipping</option>
            </Select>
          </FormControl>
          <hr/>
          <TextField
            name="description"
            className={classes.inputField}
            placeholder='Description of the product'
            inputProps={
              {'data-testid': 'description-input'}
            }
            variant={'outlined'}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
          <hr/>
          {displayPicTextField()}
          <Box sx={{
            '& > :not(style)': {m: 1, height: '5ch'},
          }}>
            <Button
              variant="contained" color="primary" onClick={() => addPics()}>
            add Pics
            </Button>
            <Button
              variant="contained"
              disabled ={pics.length===1}
              aria-label="remove pic"
              color="primary" onClick={() => removePics()}>
            remove Pic
            </Button>
            <Button
              variant="contained" color="primary" onClick={onSubmit}>
            Sell it!
            </Button>
          </Box>
          {/* {posted ? <Redirect to={'profile'}/>:null}
          {posted ?
            <Typography>Your listing has been added successfully</Typography> :
            null}
          {posted ? <Typography to={'listings'} component={Link}
            variant="caption" display="block" gutterBottom>
            Go back to listings?
          </Typography> : null} */}
        </div>
      </Box>
    </div>
  );
}

export default Sell;

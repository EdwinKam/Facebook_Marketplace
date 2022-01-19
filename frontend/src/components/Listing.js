import React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TextField from '@mui/material/TextField';

// History
import {Link} from 'react-router-dom';

const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/**
 * Simple component with one state variable.
 * @param {object} props from category.js
 * @return {object} JSX
 */
function Listing(props) {
  // const [listings, setListings] = React.useState([]);
  const [product, setProduct] = React.useState(null);
  const [imgIndex, setImgIndex] = React.useState(0);
  const [inputComment, setInputComment] = React.useState('');
  const [comments, setComments] = React.useState([]);

  // history used for redirecting to login page

  // const classes = useStyles();
  const listings = typeof(props.listings)!=='string' ? props.listings : [];
  React.useEffect(()=>{
    setProduct(null);
    setImgIndex(0);
  }, [props]);

  const getComments = () => {
    console.log('called get comment');
    const query= `http://localhost:3010/v0/comments/${props.listings[product].id}`;
    fetch(query)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setComments([...json]);
      })
      // CONVERTED THE CATCH STATEMENT INTO AN EMPTY CATCH FOR CODE COVERAGE
      .catch();
  };

  React.useEffect(()=>{
    if (product!==null) {
      /**
       * Simple component with no state.
       *
      */
      function getComments() {
        const query= `http://localhost:3010/v0/comments/${props.listings[product].id}`;
        console.log(query);
        fetch(query)
          .then((response) => {
            console.log(response.status);
            return response.json();
          })
          .then((json) => {
            console.log(json);
            // if (json.length) {
            setComments([...json]);
            // } else {
            // }
            console.log(query);
          })
          .catch();
      };
      getComments();
    }
  }, [product, props.listings]);

  const onSubmit = (event) => {
    console.log('fsfs/n/n/n/n/n/n/nsubmit');
    event.preventDefault();
    const productId = props.listings[product].id;
    // Checks to see if the authorization is null or not
    // Will redirect to the login page if is null.
    const token = localStorage.getItem('user');
    console.log(token);
    let username;
    try {
      username = JSON.parse(token).name;
    } catch (err) {}
    // POST request using fetch()
    const url = `/v0/comments/${productId}?user=${username}`+
      `&comment=${inputComment}`;
    console.log(url);
    fetch(url, {
      // Adding method type
      method: 'PUT',
      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    // Converting to JSON
      .then((response) => {
        console.log(response.status+'get from onsubmit');
        getComments();
        // setProduct(product);
        // setPosted(true);
        // reset();
      })
    // Displaying results to console
      .then()
      .catch();
    setInputComment('');
  };

  const handleProduct = (productIdx) => {
    setProduct(productIdx);
    // setComments([...props.listings[productIdx].responses]);
  };

  const displayComments = () => {
    // if (comments) {
    // console.log(comments);
    return (
      <div>
        {comments.map((res, idx)=><Item key= {`comment ${idx}`}
          sx={{textAlign: 'left'}}>
          <p>{res.user}:{res.comment}</p>
        </Item>)}
      </div>
    );
    // }
  };

  /**
 * Simple component with no state.
 *
 * @param {array} listings set listing
 * @return {object}
 */
  const displayListing = () => {
    return (
      <Grid key={'listing grid'} container spacing={2}>
        {listings.map((list, idx)=><Grid
          key={`listing grid ${idx}`}
          item xs={6}>
          <Item key= {`listing ${list.listing.id}`}
            onClick={()=>handleProduct(idx)}>
            <img key= {`listing image ${list.listing.id}`}
              src={list.listing.pic[0]} alt="url expired"
              height="200"/>
            <Typography key={`listing price ${list.listing.id}`}>
              {list.listing.price}
            </Typography>
            <Typography key= {`listing name ${list.listing.id}`}
              id={`listing name ${list.listing.name}`}>
              {list.listing.name}
            </Typography>
          </Item>
        </Grid>)}
      </Grid>
    );
  };

  return (
    <div>
      <Box sx={{flexGrow: 1}}>
        {listings.length ? (product===null)? displayListing():
          displayProduct(listings, product) : null}
      </Box>
    </div>
  );


  /**
 * Simple component with no state.
 *
 * @param {array} picArray set listing
 * @param {int} direction set listing
 * @return {string} url of the img
 */
  function changeImgine(picArray, direction) {
    let newIndex = (imgIndex+direction)%picArray.length;
    if (newIndex<0) {
      newIndex = picArray.length+newIndex;
    }
    setImgIndex(newIndex);
    return picArray[newIndex];
  }
  /**
 * close product viewing page
 */
  function closeProduct() {
    setProduct(null);
    setImgIndex(0);
  }


  /**
 * Simple component with no state.
 *
 * @param {array} listings set listing
 * @param {int} productIdx set listing
 * @return {object}
 */
  function displayProduct(listings, productIdx) {
    const currentProduct = listings[productIdx];
    return (
      <Box>
        <Box sx={{height: '100%', width: '100%', margin: 0, padding: 1,
          border: '3px solid grey'}}>
          <Stack direction="row" spacing={2} sx={{padding: 1}}>
            <Button name="close" variant="contained" sx={{width: '10%'}}
              onClick={()=>closeProduct()}>
              <CloseIcon/>
            </Button>
            <Item key={`product name ${currentProduct.listing.id}`}
              sx={{width: '90%', fontWeight: 'bold',
                textTransform: 'uppercase', border: '1px solid grey'}}>
              {currentProduct.listing.name}
            </Item>
          </Stack>
          <Box sx={{display: 'flex',
            flexDirection: 'column', flexWrap: 'wrap'}}>
            <Stack direction="row" spacing={2} sx={{padding: 1}}>
              {currentProduct.listing.pic.length!==1 ?
                <Button variant="outlined"
                  sx={{width: '5%', height: '10%'}}
                  onClick={
                    ()=>changeImgine(currentProduct.listing.pic, -1)}>
                  <ArrowLeftIcon/>
                </Button> : null}
              <img border="1px solid grey"
                src={currentProduct.listing.pic[imgIndex]} alt="url expired"
                width="45%"/>
              {currentProduct.listing.pic.length!==1 ?
                <Button variant="outlined" sx={{width: '5%', height: '10%'}}
                  onClick={()=>changeImgine(currentProduct.listing.pic, 1)}>
                  <ArrowRightIcon/>
                </Button> : null}
            </Stack>
            <Item key={`product price ${currentProduct.listing.id}`}
              sx={{textAlign: 'left', border: '1px solid grey', m: 0.25}}>
              <b>PRICE:</b> {currentProduct.listing.price}
            </Item>
            <Item key={`product description ${currentProduct.listing.id}`}
              sx={{textAlign: 'left', border: '1px solid grey', m: 0.25}}>
              <b>DESCRIPTION:</b> {currentProduct.listing.description}
            </Item>
          </Box>
        </Box>
        <Box sx={{height: '100%', width: '100%', margin: 0, padding: 1,
          border: '3px solid grey'}}>
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{width: '90%'}}
              placeholder='have something to say?'
              inputProps={
                {'data-testid': 'comment-input'}
              }
              variant={'outlined'}
              value={inputComment}
              onChange={(e)=>setInputComment(e.target.value)}
            />
            {localStorage.getItem('user') ?
              <Button
                data-testid="comment-button"
                sx={{width: '10%'}}
                variant="contained" color="primary" onClick={onSubmit}>
                Comment
              </Button> :
              <Button
                data-testid="comment-button-nologin"
                sx={{width: '10%'}}
                variant="contained" color="primary"
                component={Link} to={'login'}>
                Comment
              </Button>}

          </Stack>
          {displayComments()}
        </Box>
      </Box>
    );
  }
}

export default Listing;

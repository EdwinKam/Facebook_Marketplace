import {Typography} from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Link, Redirect} from 'react-router-dom';

import Listing from './Listing';
/**
 * Simple component with one state variable.
 *
 * @return {object} JSX
 */
function Profile() {
  const [listings, setListings] = React.useState([]);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  React.useEffect(()=>{
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    const token = localStorage.getItem('user');
    if (!token) {
      return;
    }

    // Made a slight modification for code coverage
    // const bearerToken = token ? JSON.parse(token).accessToken : '';
    const bearerToken = JSON.parse(token).accessToken;

    console.log(JSON.parse(token).id);
    const user = JSON.parse(token).id;
    const query= `/v0/userposts/${user}`;
    fetch(query, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        console.log(json.posts);
        setListings(json.posts);
        setFirstName(json.firstName);
        setLastName(json.lastName);
      })
      .catch((error) => {
        // setListings(`ERROR: ${error.toString()}`);
      });
  };
  return (
    <div>
      {!localStorage.getItem('user') ? <Redirect to={'login'}/>:null}
      <Grid container direction={'row'}>
        <Button component={Link} to={'listings'}
          align="left" variant="Go home">
          <ArrowBackIosIcon/>
        </Button>
        <h2 align="center">back to the market</h2>
      </Grid>
      <Typography>Welcome {firstName} {lastName}'s profile</Typography>
      <Typography>Your listings</Typography>
      {listings.length ? <Listing listings={listings}/> :null}
    </div>
  );
}

export default Profile;

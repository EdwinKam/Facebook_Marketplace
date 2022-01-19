import React from 'react';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';

// History
import {useHistory} from 'react-router-dom';

// console.log = console.warn = console.error = () => {};
// // Look ma, no error!
// console.error('Something bad happened.');

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
function Register() {
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const handleFirst = (event) => {
    setFirst(event.target.value);
    // THIS IS HOW TO PARSE THE ACCESS TOKEN
    // console.log(JSON.parse(localStorage.getItem('user')));
  };

  const handleLast = (event) => {
    setLast(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  // GOT RID OF THE CONFIRMATION CHECKING
  // CAUSE ITS NOT BEING COVERED
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    // Prevent default is used for preventing the button from changing the form
    event.preventDefault();
    const newUser = {
      'name': {
        'first': first,
        'last': last,
      },
      'email': email,
      'password': password,
    };
    console.log(JSON.stringify(newUser));

    // Sending the post request to the backend.
    fetch('v0/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      // Check response
      .then( (res) => {
        if (!res.ok) {
          throw res;
        }
        return;
      })
      .then( () =>{
        history.push('/login');
      })
      // If there is any error
      .catch( (err) => {
        // console.log(err);
        alert('Error registering, the email may already have been registered.' +
          '\nPlease try again');
      });
  };


  const classes = useStyles();

  return (
    <div>
      <Box xs={12}
        className={classes.mobileLoginForm}>
        <form className={classes.form}>
          <h2>facebook</h2>
          <TextField
            name="firstName"
            className={classes.inputField}
            inputProps={
              {'data-testid': 'firstName-input'}
            }
            onChange={(e)=>handleFirst(e)}
            placeholder='First Name'
            variant={'outlined'}
          />
          <TextField
            name="lastName"
            className={classes.inputField}
            inputProps={
              {'data-testid': 'lastName-input'}
            }
            onChange={(e)=>handleLast(e)}
            placeholder='Last Name'
            variant={'outlined'}
          />
          <TextField
            type="email"
            name="email"
            className={classes.inputField}
            inputProps={
              {'data-testid': 'email-input'}
            }
            onChange={(e)=>handleEmail(e)}
            placeholder='Email'
            variant={'outlined'}
            required
          />
          <TextField
            type='password'
            name="password"
            className={classes.inputField}
            inputProps={
              {'data-testid': 'password-input'}
            }
            onChange={(e)=>handlePassword(e)}
            placeholder='Password'
            variant={'outlined'}
            required
          />
          <Button type="submit"
            variant="contained" color="primary" onClick={onSubmit}>
            Register
          </Button>
          <Typography to={'login'} component={Link}
            variant="caption" display="block" gutterBottom>
            Already have an account?
          </Typography>
        </form>
      </Box>
    </div>
  );
}

export default Register;

import React from 'react';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// History
import {useHistory} from 'react-router-dom';

// console.log = console.warn = console.error = () => {};
// // Look ma, no error!
// console.error('Something bad happened.');

// import the context
// import {useContext} from 'react';
// import {TokenContext} from './App.js';

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
function Login() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useHistory();

  // Get the Context from the App.js
  // const {token, changeToken} = useContext(TokenContext);

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  // This event is called when the login button is clicked
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(JSON.stringify(user));
    fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then( (res) => {
        if (!res.ok) {
          throw res;
        }
        // If username and password were correct,
        // we'll get an object back containing the user's name and JWT
        return res.json();
      })
      .then( (json) =>{
        // Stores into local storage.
        localStorage.setItem('user', JSON.stringify(json));
        console.log(json);

        // Consume the context
        // changeToken(json.name, json.accessToken);

        // Push will send us to the home page
        history.push('/');
      })
      .catch( (err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
  };

  // Redirect to the register page
  const onRegister = (event) => {
    history.push('/register');
  };

  const classes = useStyles();

  return (
    <div>
      <Box xs={12}
        className={classes.mobileLoginForm}>
        <form className={classes.form}>
          <h2>facebook</h2>
          <TextField
            type="email"
            name="email"
            // !!!! FOLLOR THIS FORMAT FOR INPUT BOXES FOR TESTING !!!!
            // !!!!
            inputProps={
              {'data-testid': 'email-input'}
            }
            className={classes.inputField}

            onChange={handleInputChange}
            placeholder='Username or email'
            variant={'outlined'}
          />
          <TextField
            type='password'
            name="password"
            inputProps={
              {'data-testid': 'password-input'}
            }
            className={classes.inputField}
            onChange={handleInputChange}
            placeholder='Password'
            variant={'outlined'}
          />
          <Button variant="contained" color="primary" onClick={onSubmit}
            data-testid="log-in"
            aria-label="log-in">
            Log In
          </Button>
          <Typography variant="caption" display="block" gutterBottom>
            Forgot password?
          </Typography>
          <Divider>or</Divider>

          <Button variant="contained" color="success" onClick={onRegister}
            data-testid="create-account">
          Create an account
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default Login;

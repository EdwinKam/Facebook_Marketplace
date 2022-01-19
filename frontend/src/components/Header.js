import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  appBar: {
    zIndex: 1,
    background: 'white',
    color: 'blue',
  },
  button: {
    background: 'green',
    zIndex: 11,
  },
  grow: {
    flexGrow: 1,
  },

});

/**
 * Simple component with one state variable.
 *
 * @return {object} JSX
 */
function Header() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useHistory();

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
        // If username and password were correct,
        // we'll get an object back containing the user's name and JWT
        return res.json();
      })
      .then( (json) =>{
        // Stores into local storage.
        localStorage.setItem('user', JSON.stringify(json));
        // console.log(json);
        // Push will send us to the home page
        history.push('/');
      })
      .catch( (err) => {
        alert('Error logging in, please try again');
      });
  };

  const onLogout = (event) =>{
    localStorage.clear();
    history.push('/');
  };

  // A conditional renderer for the Mobile Login Button
  const LoginButton = () =>{
    return (
      <Button variant="contained"
        aria-label="login" color="primary" component={Link}
        sx={{
          'display': {xs: 'block', md: 'none'}}}
        to={'login'}>Log In</Button>
    );
  };

  const LogoutButton = () =>{
    return (
      <Button variant="contained" color="primary" onClick={onLogout}
        sx={{
          'display': {xs: 'block', md: 'none'}}
        }>
            Log Out
      </Button>
    );
  };

  // Conditional Rendering for Desktop Login
  const LoginButtonDesktop = () =>{
    return (
      <Button variant="contained"
        aria-label="login" color="primary" onClick={onSubmit}>
    Log In
      </Button>
    );
  };

  const LogoutButtonDesktop = () =>{
    return (
      <Button variant="contained" color="primary" onClick={onLogout}>
      Log Out
      </Button>);
  };

  // React Rendering
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense" >
        <p aria-label="logo">Facebook</p>
        <div className={classes.grow} />
        <Box
          component="form"
          sx={{
            'display': {xs: 'none', md: 'block'},
            '& > :not(style)': {m: 0.5, width: '20ch', height: '6ch'},
          }}
          noValidate
          autoComplete="off"
        >
          {!localStorage.getItem('user') ?
            <TextField
              type="email"
              name="email"
              className={classes.inputField}
              onChange={handleInputChange}
              placeholder='Username or email'
              variant={'outlined'}
            /> : null}
          {!localStorage.getItem('user') ?
            <TextField
              type='password'
              name="password"
              className={classes.inputField}
              onChange={handleInputChange}
              placeholder='Password'
              variant={'outlined'}
            /> : null}
          {!localStorage.getItem('user') ? <LoginButtonDesktop/>:
            <LogoutButtonDesktop/>}
        </Box>

        {!localStorage.getItem('user') ?<LoginButton/> : <LogoutButton/>}

      </Toolbar>
    </AppBar>
  );
}

export default Header;

import React from 'react';
import {Route} from 'react-router-dom';
// import Dummy from './Dummy';
import Login from './Login';
// import Header from './Header';
// import Listing from './Listing';
import Sell from './Sell';
import Categories from './categories';
import Register from './Register';
import Profile from './Profile';
/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <div>
      <Route exact path="/" component={Categories} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/listings" component={Categories} />
      <Route exact path="/sell" component={Sell} />
      <Route exact path="/profile" component={Profile} />
    </div>
  );
}

export default App;

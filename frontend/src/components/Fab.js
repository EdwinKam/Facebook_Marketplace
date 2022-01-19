import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';


/**
 * @param {object} props
 * @return {object} JSX
 */
export default function FloatingButtons(props) {
  return (
    <Box sx={{'& > :not(style)': {m: 0.75}}}>
      <Fab
        data-testid="profile fab"
        key = "fabUser"
        size="small"
        variant="extended"
        aria-label="user"
        component={Link}
        to={'profile'}
      >
        <PersonIcon />
      </Fab>
      <Fab
        key = "fabSell"
        size="small"
        variant="extended"
        aria-label="sell"
        component={Link}
        to={'sell'}
      >
        <b>sell</b>
      </Fab>
      <Fab
        data-testid="all categories fab"
        key = "fabAllCats"
        size="small"
        variant="extended"
        aria-label="all categories"
        onClick={props.handleDrawerToggle}
      >
        <b>All Categories</b>
      </Fab>
    </Box>
  );
};

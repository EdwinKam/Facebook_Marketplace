import * as React from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import Breadcrumbs from './Breadcrumbs';
/**
 *
 * @param {object} props
 * @return {object} jsx
 */
export default function SubCatButtons(props) {
  // const temp = props.subCats.map((cat)=>
  //   <Fab
  //     key = {`fab ${cat}`}
  //     size="small"
  //     variant="extended"
  //     aria-label="all categories"
  //     onClick={props.handleSubCat}
  //   >
  //     <b>{cat}</b>
  //   </Fab>,
  // );
  return (
    <Box sx={{'& > :not(style)': {m: 0.75}}}>
      <Box sx={{'& > :not(style)': {m: 0.75}}}>
        <Breadcrumbs
          handleBread = {props.handleBread}
          bread={props.bread}/>
        <Box sx={{'display': {xs: 'block', md: 'none'},
          '& > :not(style)': {m: 0.75}}}>
          <Button variant="outlined" onClick={props.handleDrawerToggle}>
            {props.bread[0]}
          </Button>
        </Box>
      </Box>
      <Stack direction="row" spacing={2}>
        {props.subCats.map((cat)=>
          <Fab
            data-testid={`subcat fab ${cat}`}
            key = {`fab ${cat}`}
            size="small"
            variant="extended"
            aria-label="all categories"
            onClick={props.handleSubCat}
          >
            <b>{cat}</b>
          </Fab>,
        )}
      </Stack>
    </Box>
  );
};


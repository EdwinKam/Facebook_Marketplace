import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';


import Header from './Header';
import Filter from './Filter';
import FilterTable from './FilterTable';
import Fab from './Fab';
import Search from './Searchbar';
import SubCatFab from './SubCatFab';

import Listing from './Listing';
const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

/**
 *
 * @param {*} props
 * @return {object} jsx
 */
function ResponsiveDrawer(props) {
  // const {window} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [condition, setCondition] = React.useState('all');
  const [delivery, setDelivery] = React.useState('all');
  const [category, setCategory] = React.useState('all');
  const [listings, setListings] = React.useState([]);
  const [subCats, setSubCats] = React.useState([]);
  const [bread, setBread] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState('');

  React.useEffect(()=>{
    const getSubCat = async () => {
      const response = await fetch('/v0/category');
      const results = await response.json();
      if (category === 'all') {
        setSubCats([]);
      } else {
        console.log(results);
        const test = results.filter((o) =>
          o.name === category);
        console.log(test);
        console.log(category);
        setSubCats(test[0].subCategory);
      }
    };
    /**
     * Simple component with no state.
     * @param {string} category
     * @param {string} condition
     * @param {string} delivery
     *
    */
    function getListing(category, condition, delivery) {
      let query= `/v0/listings?category=${category}`+
        `&condition=${condition}&delivery=${delivery}`;
      if (searchWord.length>0) {
        query+= `&productName=${searchWord}`;
        console.log('typed something');
      }
      console.log(query);
      fetch(query)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setListings(json);
        });
    };
    getListing(category, condition, delivery);
    getSubCat();
  }, [category, condition, delivery, searchWord]);


  const handleBread = (e) => {
    e.preventDefault();
    const temp = e.target.textContent.toLowerCase();
    setCategory(temp);
    // getListing(temp, condition, delivery);
    // getSubCat(temp);
    if (temp==='all') {
      setBread([]);
    } else if (temp!==category) {
      console.log(category);
      bread.splice(bread.indexOf(temp)+1);
    }
  };
  const handleSubCat = (e) => {
    const temp = e.target.textContent.toLowerCase();
    setCategory(temp);
    // getListing(temp, condition, delivery);
    // getSubCat(temp);
    setBread([...bread, temp]);
  };
  const handleCondition = (e) => {
    const temp = e.target.value;
    setCondition(temp);
    // getListing(category, temp, delivery, setListings);
  };
  const handleDelivery = (e) => {
    const temp = e.target.value;
    setDelivery(temp);
    // getListing(category, condition, temp, setListings);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        {['Electronics', 'Apparel'].map((text, index) => (
          <ListItem data-testid="categories button"
            button key={text}
            onClick ={(e)=>{
              handleDrawerToggle();
              const temp = e.target.textContent.toLowerCase();
              setCategory(temp);
              if (temp!==category) {
                setBread([temp]);
              }
            }}>
            <ListItemIcon>
              {index % 2 === 0 ? <PhoneAndroidIcon /> : <CheckroomIcon />}
            </ListItemIcon>
            <ListItemText primary={text}
              aria-label={'cat-main-'+text}
              role="button"
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = undefined;
  // window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}
        aria-label="categories-drawer"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            'display': {xs: 'block', md: 'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <DrawerHeader>
            <IconButton data-testid="mobile drawer close"
              onClick={handleDrawerToggle}>
              <CancelIcon />
            </IconButton>
          </DrawerHeader>
          {drawer}
        </Drawer>
        <Header/>
        <Drawer
          variant="permanent"
          sx={{
            'display': {xs: 'none', md: 'block'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerHeader />
          <Button component={Link} to={'sell'} variant="outlined">
           + Create new listing
          </Button>
          <Search
            data-testid="desktop search-input"
            listings={listings} setSearchWord={setSearchWord}
            testIdprops="desktop"/>
          {drawer}
          <Table aria-label="filter table">
            <TableHead>
              <TableRow>
                <TableCell>FILTERS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <FilterTable handleCondition={handleCondition}
                    condition = {condition}
                    handleDelivery={handleDelivery}
                    delivery={delivery}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Header/>
        </Drawer>
      </Box>
      {/* <Listing component="nav"
        sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}
        aria-label="categories-listing" listings={listings}/> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {md: `calc(100% - ${drawerWidth}px)`},
        }}
      >
        <DrawerHeader />
        <div>
          <Box sx={{'& > :not(style)': {m: 0.75},
            'display': {xs: 'block', md: 'none'}}}>
            {(category==='all') ?
              <Fab handleDrawerToggle={handleDrawerToggle}/>:
              <SubCatFab
                data-testid="subcatfab"
                subCats={subCats} handleSubCat={handleSubCat}
                handleBread={handleBread} bread={bread}
                handleDrawerToggle={handleDrawerToggle}/>}
            <Search
              data-testid="desktop search"
              listings={listings} setSearchWord={setSearchWord}/>
            <hr/>
            <Filter handleCondition={handleCondition}
              condition = {condition}
              handleDelivery={handleDelivery}
              delivery={delivery}/>
          </Box>
        </div>
        <Box sx={{'& > :not(style)': {m: 0.75},
          'display': {xs: 'none', md: 'block'}}}>
          {/* {(category==='all') ?
            <Box/>: */}
          <SubCatFab
            data-testid="subcatfab"
            category={category}
            subCats={subCats} handleSubCat={handleSubCat}
            handleBread={handleBread} bread={bread} />
        </Box>
        <Listing listings={listings}/>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

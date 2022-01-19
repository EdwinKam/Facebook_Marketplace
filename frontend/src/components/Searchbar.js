import * as React from 'react';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

/**
 * @param {object} props
 * @return {object} JSX
 */
export default function FreeSolo(props) {
  const [input, setInput] = React.useState('');
  const handleChange = (value) => {
    setInput(value);
    props.setSearchWord(value);
  };
  return (
    <TextField
      inputProps={
        {'data-testid': 'search-input-'+props.testIdprops}
      }
      //   data-testid={'search-input-'+props.testIdprops}
      placeholder='Search'
      variant={'outlined'}
      value={input}
      onChange={(e)=>handleChange(e.target.value)}
    />

  );
}

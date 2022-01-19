import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';

/**
 * @param {object} props
 * @return {object} JSX
 */
export default function RadioButtonsGroup(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{'& > *': {borderBottom: 'unset'}}}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell> Delivery </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} />
        <TableCell style={{paddingBottom: 0, paddingTop: 0}}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Delivery"
                value={props.delivery}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All"
                  onClick={ (e)=>{
                    props.handleDelivery(e);
                    setOpen(!open);
                    if (props.handlePopover) {
                      props.handlePopover();
                    }
                  }}/>
                <FormControlLabel
                  value="shipping"
                  control={<Radio />}
                  label="Shipping"
                  onClick={ (e)=>{
                    props.handleDelivery(e);
                    setOpen(!open);
                    if (props.handlePopover) {
                      props.handlePopover();
                    }
                  }}
                />
                <FormControlLabel
                  value="local pickup"
                  control={<Radio />}
                  label="Local Pickup"
                  onClick={ (e)=>{
                    props.handleDelivery(e);
                    setOpen(!open);
                    if (props.handlePopover) {
                      props.handlePopover();
                    }
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

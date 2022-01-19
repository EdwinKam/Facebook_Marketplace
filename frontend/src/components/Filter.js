import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import CancelIcon from '@mui/icons-material/Cancel';

import ConditionRB from './ConditionRB';
import DeliveryRB from './DeliveryRB';

/**
 * @param {object} props
 * @return {object} JSX
 */
export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button data-testid="mobile filter pop"
        aria-describedby={id} variant="contained" onClick={handleClick}>
        <FilterAltIcon />
        FILTERS
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell/>
                <TableCell align="right">
                  <CancelIcon data-testid="mobile filter pop close"
                    onClick ={handleClose}/>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <ConditionRB handleCondition={props.handleCondition}
                condition={props.condition}
                handlePopover={handleClose}/>
              <DeliveryRB handleDelivery={props.handleDelivery}
                delivery={props.delivery}
                handlePopover={handleClose}/>
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </div>
  );
}

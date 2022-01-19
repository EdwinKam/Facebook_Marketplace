import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';


import ConditionRB from './ConditionRB';
import DeliveryRB from './DeliveryRB';

/**
 * @param {objec} props
 * @return {object} JSX
 */
export default function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          <ConditionRB handleCondition={props.handleCondition}
            condition={props.condition}/>
          <DeliveryRB handleDelivery={props.handleDelivery}
            delivery={props.delivery}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

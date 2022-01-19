import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
/**
 * @param {object} props
 * @return {object} JSX
 */
export default function CustomSeparator(props) {
  const breadcrumbs = [
    <Link
      data-testid="all breadcrumbs"
      underline="hover"
      key="breadcrumbs marketplace"
      color="inherit"
      href="/"
      onClick={props.handleBread}
    >
      All
    </Link>,
  ];
  // for (const bread of props.bread) {
  //   breadcrumbs.push(
  //     <Link
  //       underline="hover"
  //       key= {`breadcrumbs ${bread}`}
  //       color="inherit"
  //       href="/"
  //       onClick={props.handleBread}
  //     >
  //       {bread}
  //     </Link>);
  // }
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {breadcrumbs}
      {props.bread.map((bre) =>
        <Link
          data-testid="subcat breadcrumb"
          underline="hover"
          key= {`breadcrumbs ${bre}`}
          color="inherit"
          onClick={props.handleBread}
        >
          {bre}
        </Link>,
      )}
    </Breadcrumbs>
  );
}

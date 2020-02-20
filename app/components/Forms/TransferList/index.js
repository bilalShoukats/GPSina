import React, {Fragment} from 'react';
import {Grid} from '@material-ui/core';
import Card from 'components/Card/Loadable'
import SympleTransferList from './Components/symple'
import EnhancedTransferList from './Components/enhanced'
import './style.scss'

const TransferList = () => {
  return (
    <Fragment>
      <h2 className="breadcumbTitle">Transfer file</h2>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <Card
            title="Simple Transfer List"
          >
            <SympleTransferList/>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card
            title="Enhanced Transfer List"
          >
            <EnhancedTransferList/>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default TransferList

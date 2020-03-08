import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, Button } from '@material-ui/core';
import Card from '../../../components/Card';
import './style.scss';


const Report = (props) => (
  <Card>
    <Grid className="responsiveTable">
      <Table className="postTable" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Route Name</TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'flex-end' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ width: '50%' }}>
              <strong className="uThum">
                {props.item.routeName}
              </strong>
            </TableCell>
            <TableCell style={{ width: '50%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <div style={{ marginLeft: 5 }}>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.editRoute()
                  }} xl={6} className='btn bg-dark'>
                    <i className="icofont-ui-edit" />
                  </Button>
                </div>
                <div style={{ marginLeft: 5 }}>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.openConfirmModal()
                  }} xl={6} className='btn bg-danger'>
                    <i className="icofont-ui-delete" />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  </Card>
)
export default Report;


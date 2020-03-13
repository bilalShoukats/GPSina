import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, Button } from '@material-ui/core';
import Card from '../../../components/Card';
import img from '../../../images/team/task_member.png'
import './style.scss';


const Report = (props) => (
  <Card>
    <Grid className="responsiveTable">
      <Table className="postTable" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell style={{ minWidth: '140px' }}>Device Id</TableCell>
            <TableCell style={{ minWidth: '140px' }}>Registration No</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Grid className="icon">
                <img src={img} alt="thumb" />
              </Grid>
            </TableCell>
            <TableCell>
              <strong className="uThum">{props.item.deviceID}</strong>
            </TableCell>
            <TableCell>
              <strong className="uThum">{props.item.registrationNo}</strong>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex', flexDirection: 'row', }}>
                <div style={{ marginLeft: 5 }}>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.openConfirmModal()
                  }} xl={6} className='btn bg-danger'>
                    <i className="icofont-ui-delete" />
                  </Button>
                </div>
                <div style={{ marginLeft: 5 }}>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.assignCar()
                  }} xl={6} className='btn bg-success'>
                    <i className="fa fa-car" />
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


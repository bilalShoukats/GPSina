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
            <TableCell>Name</TableCell>
            <TableCell>Director</TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Grid className="icon">
                <img src={props.item.companyLogo ? props.item.companyLogo : img} alt="thumb" height={50} width={50} />
              </Grid>
            </TableCell>
            <TableCell>
              <strong className="uThum">
                {props.item.companyName.substring(0, 5)}
              </strong>
            </TableCell>
            <TableCell>
              <strong className="uThum">
                {props.item.director.substring(0, 5)}
              </strong>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div style={{ marginLeft: 5 }}>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.openAssignCompanyModal()
                  }} disabled={props.item.owner === '' ? false : true} xl={6} className='btn bg-success'>
                    <i className="fa fa-user" />
                  </Button>
                </div>
                <div style={{ marginLeft: 5 }}>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.editCompany()
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


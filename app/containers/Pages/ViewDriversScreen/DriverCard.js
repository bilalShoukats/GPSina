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
            {/* <TableCell>Phone</TableCell> */}
            <TableCell>Liscense</TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'center' }}>Actions</TableCell>
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
              <strong className="uThum">
                {props.item.driverName}
              </strong>
            </TableCell>
            {/* <TableCell>
              <strong className="uThum">
                {props.item.driverPhone}
              </strong>
            </TableCell> */}
            <TableCell>
              <strong className="uThum">
                {props.item.licenceNumber}
              </strong>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.openNotificationsModal()
                  }}
                    style={{ visibility: 'visible' }}
                    xl={6}
                    className='btn bg-primary tooltipWrap topTooltip' >
                    <span className="tooltip">Notifications</span>
                    <i className="icofont-notification"
                    />
                  </Button>
                </div>
                <div style={{ marginLeft: 5 }}>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.editDriver()
                  }} xl={6} className='btn bg-dark tooltipWrap topTooltip'>
                    <span className="tooltip">Edit Driver</span>
                    <i className="icofont-ui-edit" />
                  </Button>
                </div>
                <div style={{ marginLeft: 5 }}>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    props.openConfirmModal()
                  }} xl={6} className='btn bg-danger tooltipWrap topTooltip'>
                    <span className="tooltip">Delete Driver</span>
                    <i className="icofont-ui-delete" />
                  </Button>
                </div>
                {
                  props.item.registrationNo === '' ? <div style={{ marginLeft: 5 }}>
                    <Button onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.assignCarToDriver()
                    }} xl={6} className='btn bg-success tooltipWrap topTooltip'>
                      <span className="tooltip">Assign Vehicle</span>
                      <i className="fa fa-car" />
                    </Button>
                  </div> : <div style={{ marginLeft: 5 }}>
                      <Button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.openConfirmUnAssignModal()
                      }} xl={6} className='btn bg-secondary tooltipWrap topTooltip'>
                        <span className="tooltip">Unassign Vehicle</span>
                        <i className="fa fa-car" />
                      </Button>
                    </div>
                }
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  </Card>
)
export default Report;


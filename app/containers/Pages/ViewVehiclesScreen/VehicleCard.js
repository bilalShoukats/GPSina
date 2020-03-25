import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, Button } from '@material-ui/core';
import Card from '../../../components/Card';
import './style.scss';


const VehicleCard = (props) => {
  let deviceEnabled = true;
  let statusStyle = {};
  if (props.item.deviceActive == false) {
    deviceEnabled = false;
    statusStyle = { color: "red" }
  }
  return (
    <Card>
      <Grid className="responsiveTable">
        <Table className="postTable" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Registration No</TableCell>
              <TableCell style={{ minWidth: '140px' }}>Vehicle Status</TableCell>
              <TableCell style={{ minWidth: '140px' }}>Car Owner</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong className="uThum">{props.item.registrationNo}</strong>
              </TableCell>
              <TableCell>
                <strong className="uThum" style={statusStyle}>{(deviceEnabled == true) ? "Active" : "Pending"}</strong>
              </TableCell>
              <TableCell>
                <strong className="uThum">{props.item.carOwnerName}</strong>
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <div>
                    <Button disabled={!deviceEnabled} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.viewVehicle()
                    }}
                      style={{ visibility: 'visible' }}
                      xl={6}
                      className='btn bg-warning tooltipWrap topTooltip' >
                      <span className="tooltip">View Vehicle</span>
                      <i className="fa fa-eye" />
                    </Button>
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <Button disabled={!deviceEnabled} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.editFence()
                    }}
                      style={{ visibility: 'visible' }}
                      xl={6}
                      className='btn bg-dark tooltipWrap topTooltip' >
                      <span className="tooltip">Assign Fence</span>
                      <i className="fa fa-arrows" />
                    </Button>
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <Button disabled={!deviceEnabled} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.editVehicle()
                    }}
                      style={{ visibility: 'visible' }}
                      xl={6}
                      className='btn bg-dark tooltipWrap topTooltip' >
                      <span className="tooltip">Edit Vehicle</span>
                      <i className="fa fa-edit" />
                    </Button>
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <Button disabled={!deviceEnabled} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.openNotificationsModal()
                    }}
                      style={{ visibility: 'visible' }}
                      xl={6}
                      className='btn bg-primary tooltipWrap topTooltip' >
                      <span className="tooltip">Notifications</span>
                      <i className="icofont-notification" />
                    </Button>
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <p>{props.item.id}</p>
                    <Button disabled={!deviceEnabled} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.openVehicleSettings()
                    }} xl={6} className='btn bg-dark tooltipWrap topTooltip'>
                      <span className="tooltip">Settings</span>
                      <i className="fa fa-sliders" />
                    </Button>
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <Button disabled={!deviceEnabled} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.openConfirmModal()
                    }} xl={6} className='btn bg-danger tooltipWrap topTooltip'>
                      <span className="tooltip">Delete Vehicle</span>
                      <i className="icofont-ui-delete" />
                    </Button>
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <Button disabled={!deviceEnabled} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.openAttachDeviceModal()
                    }} xl={6} className='btn bg-success tooltipWrap topTooltip'>
                      <span className="tooltip">Attach Device</span>
                      <i className="fa fa-bolt" />
                    </Button>
                  </div>
                  <div style={{ marginLeft: 5 }}>
                    <Button disabled={!deviceEnabled} onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.openAssignDriverModal()
                    }} xl={6} className='btn bg-success tooltipWrap topTooltip'>
                      <span className="tooltip">Assign Driver</span>
                      <i className="fa fa-user" />
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
};
export default VehicleCard;


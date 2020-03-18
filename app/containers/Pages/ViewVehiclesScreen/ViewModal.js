import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Card from 'components/Card/Loadable'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import './style.scss'
import { Link } from 'react-router-dom';
import { Grid, Menu, Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollArea from 'react-scrollbar';
import { textAlign } from '@material-ui/system';

export default class ViewModal extends Component {

  render() {
    console.log("view modal props: ", this.props);
    return (
      <Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          className="modalWrapper"
        >
          <div className="modalHead">
            <DialogContent style={{ padding: 0 }}>
              <div className="notificationList">
                <h5>
                  Vehicle Detail
                </h5>
                <ScrollArea
                  speed={1}
                  className="scrollbarArea"
                  contentClassName="scrollbarContent"
                  horizontal={false}
                >
                <ul className="notificationItems">
                  <Card>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car ID:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.carID}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Model:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.carModel}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Owner Email:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.carOwnerEmail}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Owner Name:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.carOwnerName}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Chassis:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.chassis}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Color:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.color}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Status:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.deviceActive == true ? "Active" : "Pendimg"}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Device ID:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.deviceID}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Engine No:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.engineNo}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Fuel Type:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.fuelType}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Mileage:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.mileage}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <h4>
                        Car Registration No:
                      </h4>
                      <h4>
                        {this.props.vehicleDetail.registrationNo}
                      </h4>
                    </div>
                  </Card>
                </ul>
                </ScrollArea>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}

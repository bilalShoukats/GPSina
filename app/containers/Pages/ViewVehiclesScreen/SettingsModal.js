import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

export default class SettingsModal extends Component {
  state = {
    vibrateNotification: false,
    overSpeed: false,
    acc: false,
    showSettingsModal: false,
    deviceId: ''
  }
  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  validationFunction(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  render() {
    return (
      <Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          className="modalWrapper"
        >
          <div className="modalHead" >
            <Grid className="modalTitle">
              <h3>Settings</h3>
            </Grid>
            <DialogContent >
              <div className="modalContent">
                <h4>
                  Device ID:
                </h4>
                <span>
                  {this.props.carID}
                </span>
              </div>
              <div className="modalContent">
                <h4>
                  Vibrate Notification:
                </h4>
                <Switch
                  checked={this.state.vibrateNotification}
                  onChange={this.handleChange('vibrateNotification')}
                  value="vibrateNotification"
                  classes={{
                    root: 'switchDefault',
                    switchBase: 'switchBase',
                    thumb: 'switchThumb',
                    track: 'switchTrack',
                    checked: 'switchChecked'
                  }}
                />
              </div>
              <div className="modalContent">
                <h4>Speed</h4>
                <input
                  onKeyPress={(e) => this.validationFunction(e)}
                  type="text"
                  placeholder=""
                  ref="title"
                  autoFocus
                  name='speed'
                  style={{ width: '20vh' }}
                  onChange={this.handleInputChange}
                  value={this.state.speed}
                />
                <Button className='btn bg-default' style={{ padding: 0 }}>
                  Save
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', marginBottom: 10, alignItems: 'center' }}>
                <h4>{'SOS  '}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 14 }}>
                  <input
                    onKeyPress={(e) => this.validationFunction(e)}
                    type="text"
                    placeholder=""
                    ref="title"
                    autoFocus
                    style={{ width: '20vh' }}
                    name='sos1'
                    onChange={this.handleInputChange}
                    value={this.state.sos1}
                  />
                  <input
                    onKeyPress={(e) => this.validationFunction(e)}
                    type="text"
                    placeholder=""
                    ref="title"
                    autoFocus
                    style={{ width: '20vh' }}
                    name='sos2'
                    onChange={this.handleInputChange}
                    value={this.state.sos2}
                  />
                  <input
                    onKeyPress={(e) => this.validationFunction(e)}
                    type="text"
                    placeholder=""
                    ref="title"
                    autoFocus
                    style={{ width: '20vh' }}
                    name='sos3'
                    onChange={this.handleInputChange}
                    value={this.state.sos3}
                  />
                </div>
                <Button className='btn bg-default' style={{ padding: 0 }} onClick={this.saveSpeed}>
                  Save
                 </Button>
              </div>
              <div className="modalContent">
                <h4>
                  Acc:
                </h4>
                <Switch
                  checked={this.state.acc}
                  onChange={this.handleChange('acc')}
                  value="acc"
                  classes={{
                    root: 'switchDefault',
                    switchBase: 'switchBase',
                    thumb: 'switchThumb',
                    track: 'switchTrack',
                    checked: 'switchChecked'
                  }}
                />
              </div>
              <div className="modalContent">
                <h4>
                  Over Speed:
                </h4>
                <Switch
                  checked={this.state.overSpeed}
                  onChange={this.handleChange('overSpeed')}
                  value="overSpeed"
                  classes={{
                    root: 'switchDefault',
                    switchBase: 'switchBase',
                    thumb: 'switchThumb',
                    track: 'switchTrack',
                    checked: 'switchChecked'
                  }}
                />
              </div>
            </DialogContent>
            <Grid className="modalFooter">
              <Button style={{ padding: '5px 20px' }} className="bg-warning" onClick={this.props.close}>
                Cancel
              </Button>
              <Button style={{ padding: '5px 20px' }} className="bg-success" onClick={this.props.close}>
                Assign
              </Button>
            </Grid>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}

import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../components/UI_Elements/SweetAlert/alert';

export default class ConfirmModal extends Component {

  deleteDevice = () => {
    let body = {
      email: this.props.deviceID,
    }

    this.props.apiManager.makeCall('deleteDevice', body, res => {
      if (res.code === 1016) {
        toast.success(res.id);
        this.props.reloadDevicesList()
      }
      else {
        toast.error(res.id);
        this.props.close()
      }
    })
  }

  render() {
    return (
      <Fragment>
        <SweetAlertSingle
          title="Are you sure you want to delete this device?"
          show={this.props.open}
          type="error"
          error
          confirmButtonText="Yes"
          cancelButtonText='No'
          showCancelButton={true}
          onConfirm={() => {
            this.deleteDevice()
          }}
          onCancel={() => {
            this.props.close()
          }}
          showLoaderOnConfirm={true}
        />
      </Fragment>
    )
  }
}
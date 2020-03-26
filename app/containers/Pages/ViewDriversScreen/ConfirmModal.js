import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../../app/components/UI_Elements/SweetAlert/alert';
import { SuperHOC } from '../../../HOC';

class ConfirmModal extends Component {
  deleteCar = () => {
    let body = {
      driverEmail: this.props.driverEmail,
    }
    this.props.apiManager.makeCall('deleteDriver', body, res => {
      console.log('assign cars - view', res)
      console.log('assign cars - view', this.props)
      if (res) {
        this.props.getAllDrivers()
        toast.success(res.id)
      }
      else {
        toast.error(res.id);
      }
      this.props.close();
    })
  }
  render() {
    return (
      <Fragment>
        <SweetAlertSingle
          title="Are you sure you want to delete this driver?"
          show={this.props.open}
          type="error"
          error
          confirmButtonText="Yes"
          cancelButtonText='No'
          showCancelButton={true}
          onConfirm={() => {
            this.deleteCar()
          }}
          onCancel={() => {
            this.props.close()
          }}
          // text={<span>Please check your internet connection.</span>}
          showLoaderOnConfirm={true}
        />
      </Fragment>
    )
  }
}
export default SuperHOC(ConfirmModal)


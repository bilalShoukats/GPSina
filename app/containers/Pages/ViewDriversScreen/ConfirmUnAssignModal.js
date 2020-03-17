import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../components/UI_Elements/SweetAlert/alert';
import { SuperHOC } from '../../../HOC';

class ConfirmModal extends Component {
  unAssignCar = () => {
    let body = {
      registrationNo: this.props.registrationNo,
    }
    this.props.apiManager.makeCall('unAssignDrivertoVehicle', body, res => {
      console.log('unassign cars - view', res)
      console.log('unassign cars - view', this.props)
      if (res.code === 5032) {
        this.props.close()
        toast.success(res.id);
      }
      else {
        toast.error(res.id);
      }
    })
  }
  render() {
    return (
      <Fragment>
        <SweetAlertSingle
          title="Are you sure you want to un-assign this driver?"
          show={this.props.open}
          type="error"
          error
          confirmButtonText="Yes"
          cancelButtonText='No'
          showCancelButton={true}
          onConfirm={() => {
            this.unAssignCar()
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

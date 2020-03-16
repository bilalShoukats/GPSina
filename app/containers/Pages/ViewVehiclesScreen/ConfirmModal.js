import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../../app/components/UI_Elements/SweetAlert/alert';

export default class ConfirmModal extends Component {
  deleteCar = () => {
    let body = {
      registrationNo: this.props.registrationNo,
    }
    this.props.apiManager.makeCall('deleteCar', body, res => {
      console.log('assign cars - view', res)
      console.log('assign cars - view', body)
      if (res.code === 1016) {
        toast.success(res.id)
        this.props.close()
        this.props.getAllMyVehicles()
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
          title="Are You Sure?"
          show={this.props.open}
          type="error"
          error
          confirmButtonText="YES"
          cancelButtonText='NO'
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

import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../../app/components/UI_Elements/SweetAlert/alert';

export default class ConfirmModal extends Component {
  deleteCar = () => {
    let body = {
      email: this.props.registrationNo,
    }
    this.props.apiManager.makeCall('deleteUser', body, res => {
      console.log('assign Users - view', res)
      console.log('assign Users - view', this.props)
      if (res) {
        alert('baawwa')
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

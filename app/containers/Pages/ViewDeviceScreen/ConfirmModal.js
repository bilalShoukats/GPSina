import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../components/UI_Elements/SweetAlert/alert';

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
          title="Are you sure you want to delete this vehicle?"
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

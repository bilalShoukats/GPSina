import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../../app/components/UI_Elements/SweetAlert/alert';

export default class ConfirmModal extends Component {
  deleteRole = () => {
    let body = {
      roleID: this.props.roleID,
    }
    this.props.apiManager.makeCall('deleteRole', body, res => {
      console.log('Delete Role - view', res)
      console.log('Delete Role - view', body)
      if (res.code === 1016) {
        toast.success('Deleted Successfully')
      }
      else {
        toast.error(res.id);
      }
      this.props.close()
    })
  }
  render() {
    return (
      <Fragment>
        <SweetAlertSingle
          title="Are you sure you want to delete this role?"
          show={this.props.open}
          type="error"
          error
          confirmButtonText="Yes"
          cancelButtonText='No'
          showCancelButton={true}
          onConfirm={() => {
            this.deleteRole()
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

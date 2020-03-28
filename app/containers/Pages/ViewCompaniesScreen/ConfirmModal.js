import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../../app/components/UI_Elements/SweetAlert/alert';

export default class ConfirmModal extends Component {
  deleteCompany = () => {
    let body = {
      companyEmail: this.props.companyEmail,
    }
    this.props.apiManager.makeCall('deleteCompany', body, res => {
      if (res.code === 1016) {
        toast.success(res.id);
        this.props.reloadCompanyList()
      }
      else {
        toast.error(res.id);
        this.props.closeConfirmModal()
      }
    })
  }
  render() {
    return (
      <Fragment>
        <SweetAlertSingle
          title="Are you sure you want to delete this company?"
          show={this.props.open}
          type="error"
          error
          confirmButtonText="Yes"
          cancelButtonText='No'
          showCancelButton={true}
          onConfirm={() => {
            this.deleteCompany()
          }}
          onCancel={() => {
            this.props.closeConfirmModal()
          }}
          showLoaderOnConfirm={true}
        />
      </Fragment>
    )
  }
}
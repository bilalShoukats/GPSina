import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import SweetAlertSingle from '../../../../app/components/UI_Elements/SweetAlert/alert';

export default class ConfirmModal extends Component {

  render() {
    return (
      <Fragment>
        <SweetAlertSingle
          title="Are you sure, you want to delete this route?"
          show={this.props.open}
          type="error"
          error
          confirmButtonText="Yes"
          cancelButtonText='No'
          showCancelButton={true}
          onConfirm={() => {
            this.props.deleteRoute()
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

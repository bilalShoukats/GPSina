import React from 'react';
import {Grid} from '@material-ui/core';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

const SweetAlertSingle = ({success, warning, error, show, onConfirm, text, title, type, confirmButtonText, cancelButtonText, showCancelButton, showLoaderOnConfirm, onCancel, info}) => {
  return (
    <SweetAlert
      customClass={`sweetAlertWrapper ${
      success && 'sweetAlertSuccess' ||
      warning && 'sweetAlertWarning' ||
      info && 'sweetAlertInfo' ||
      error && 'sweetAlertError'}`
      }
      show={show}
      title={title}
      html
      confirmButtonText={confirmButtonText}
      cancelButtonText={cancelButtonText}
      text={text}
      type={type}
      onConfirm={onConfirm}
      showCancelButton={showCancelButton}
      showLoaderOnConfirm={showLoaderOnConfirm}
      onCancel={onCancel}
    />
  )
}
export default SweetAlertSingle

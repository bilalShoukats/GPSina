import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './style.scss';

const CustomModal = (props) => {
  const {open, toggleModal, title} = props;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="modalWrapper"
      open={open}
      onClose={() => toggleModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="modalInner">
          <h2 id="transition-modal-title">{title}
            <span onClick={() => toggleModal(false)} className="closeModal ti-close"></span></h2>
          {props.children}
        </div>
      </Fade>
    </Modal>
  )
};

export default CustomModal;

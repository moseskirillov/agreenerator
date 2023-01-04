import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap'

const ToastStatus = ({showToast, setShowToast, message}) => {
  return (
    <ToastContainer className="p-3" position="top-end">
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Header>
          <strong className="me-auto">Agreenerator</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastStatus;
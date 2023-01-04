import React from 'react';
import { Button } from 'react-bootstrap'

const Buttons = ({saveHandler, setShowModal}) => {
  return (
    <div className="d-flex justify-content-center fixed-bottom p-3" style={{background: 'white'}}>
      <Button onClick={saveHandler} className="me-2" variant="primary">Сохранить данные</Button>{' '}
      <Button onClick={() => setShowModal(true)} variant="primary">Открыть форму ДС</Button>{' '}
    </div>
  );
};

export default Buttons;
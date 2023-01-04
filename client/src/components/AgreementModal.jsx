import React from 'react';
import { Modal } from 'react-bootstrap'
import AgreementForm from './AgreementForm'

const AgreementModal = ({showModal, setShowModal, submitFormHandler, type}) => {

  const docBaseInfo = new Map([
    ['Сиражева Светлана Валерьевна', {
      date: '01.17.08 от 17 августа 2022 г.',
      nameGenitive: 'Сиражевой Светланы Валерьевны',
      position: 'Руководитель группы регионального развития транспортного бизнеса'
    }],
    ['Бэнэвиз Маргарита Сергеевна', {
      date: '75.01.04 от 01 апреля 2021 г.',
      nameGenitive: 'Бэнэвиз Маргариты Сергеевны',
      position: 'Директор по транспортным операциям'
    }],
    ['Кравцова Виктория Александровна', {
      date: '01.16.09 от 16 мая 2022 г.',
      nameGenitive: 'Кравцовой Виктории Александровны',
      position: 'Руководитель группы ведения клиентов'
    }],
    ['Разин Виктор Александрович', {
      date: '06.01.04 от 01 апреля 2022 г.',
      nameGenitive: 'Разина Виктора Александровича',
      position: 'Руководитель группы по развитию транспортного бизнеса'
    }],
    ['Котенко Татьяна Викторовна', {
      date: '04.01.05 от 01 мая 2022 г.',
      nameGenitive: 'Котенко Татьяны Викторовны',
      position: 'Коммерческий директор'
    }],
    ['Резник Андрей Витальевич', {
      date: '01.13.10 от 13 октября 2022 г.',
      nameGenitive: 'Резника Андрея Витальевича',
      position: 'Коммерческий директор'
    }]
  ])

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="agreement-fields">
          Все поля обязательны для заполнения
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AgreementForm submitFormHandler={submitFormHandler} docBaseInfo={docBaseInfo} type={type}/>
      </Modal.Body>
    </Modal>
  );
};

export default AgreementModal;
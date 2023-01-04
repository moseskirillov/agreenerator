import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { instance } from '../axios'

const AgreementForm = ({submitFormHandler, docBaseInfo, type}) => {

  useEffect(() => {
    getAddresses()
    .then(response => {
      setAddresses(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  }, [])

  const getAddresses = async () => {
    return await instance.get('/rows/addresses')
  }

  const [addresses, setAddresses] = useState([])
  const [docType, setDocType] = useState('')
  const [docDate, setDocDate] = useState('')
  const [docNumber, setDocNumber] = useState('')
  const [contractNumber, setContractNumber] = useState('')
  const [contractDate, setContractDate] = useState('')
  const [validityContractDate, setValidityContractDate] = useState('')
  const [opfClient, setOpfClient] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientNameGenitive, setClientNameGenitive] = useState('')
  const [customerPosition, setCustomerPosition] = useState('')
  const [docBase, setDocBase] = useState('')
  const [signatoryFM, setSignatoryFM] = useState('')
  const [warehouseType, setWarehouseType] = useState('')
  const [customerWarehouse, setCustomerWarehouse] = useState('')
  const [customerWarehouseMR, setCustomerWarehouseMR] = useState('')
  const [customerWarehouseMM, setCustomerWarehouseMM] = useState('')
  const [contractorWarehouse, setContractorWarehouse] = useState('')
  const [palletWeight, setPalletWeight] = useState('')
  const [insurance, setInsurance] = useState('')
  const [mm, setMm] = useState(false)
  const [mr, setMr] = useState(false)
  const [ltlNumber, setLtlNumber] = useState('')
  const [ltlDate, setLtlDate] = useState('')

  const sendFormData = () => {
    if (type === 'ltl') {
      submitFormHandler({
        docType: docType,
        docNumber: docNumber,
        docDate: docDate,
        contractNumber: contractNumber,
        contractDate: contractDate,
        validityContractDate: validityContractDate,
        opfClient: opfClient,
        clientName: clientName,
        clientNameGenitive: clientNameGenitive,
        customerPosition: customerPosition,
        docBase: docBase,
        signatoryFM: signatoryFM,
        docBaseInfo: docBaseInfo.get(signatoryFM),
        warehouseType: warehouseType,
        customerWarehouse: customerWarehouse,
        contractorWarehouse: contractorWarehouse,
        palletWeight: palletWeight,
        insurance: insurance
      }, type)
    } else if (type === 'ftl') {
      submitFormHandler({
        docType: docType,
        docNumber: docNumber,
        docDate: docDate,
        contractNumber: contractNumber,
        contractDate: contractDate,
        validityContractDate: validityContractDate,
        opfClient: opfClient,
        clientName: clientName,
        clientNameGenitive: clientNameGenitive,
        customerPosition: customerPosition,
        docBase: docBase,
        docBaseInfo: docBaseInfo.get(signatoryFM),
        signatoryFM: signatoryFM,
        customerWarehouseMR: customerWarehouseMR,
        customerWarehouseMM: customerWarehouseMM,
        moskowMoskow: mm,
        moskowRegion: mr,
        insurance: insurance
      }, type)
    } else if (type === 'pooling') {
      submitFormHandler({
        docType: docType,
        docNumber: docNumber,
        docDate: docDate,
        contractNumber: contractNumber,
        contractDate: contractDate,
        validityContractDate: validityContractDate,
        opfClient: opfClient,
        clientName: clientName,
        clientNameGenitive: clientNameGenitive,
        customerPosition: customerPosition,
        docBase: docBase,
        docBaseInfo: docBaseInfo.get(signatoryFM),
        warehouseType: warehouseType,
        customerWarehouse: customerWarehouse,
        contractorWarehouse: contractorWarehouse,
        ltlNumber: ltlNumber,
        ltlDate: ltlDate,
        signatoryFM: signatoryFM,
        palletWeight: palletWeight
      }, type)
    }
  }

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group
          className="col-3"
          controlId="formDocType">
          <Form.Label>Тип документа</Form.Label>
          <Form.Select
            defaultValue={docType}
            onChange={e => setDocType(e.target.value)}>
            <option value={docType} disabled>Выберите</option>
            <option>Приложение</option>
            <option>Доп. соглашение</option>
          </Form.Select>
        </Form.Group>
        <Form.Group
          className="col-3"
          controlId="formDocNumber">
          <Form.Label>Номер документа</Form.Label>
          <Form.Control
            value={docNumber}
            onChange={e => setDocNumber(e.target.value)}
            placeholder="Номер документа"/>
        </Form.Group>
        <Form.Group
          className="col-3"
          controlId="formDocDate">
          <Form.Label>Дата документа</Form.Label>
          <Form.Control
            value={docDate}
            onChange={e => setDocDate(e.target.value)}
            type="date"
            placeholder="Дата документа"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group
          className="col-3"
          controlId="formContractNumber">
          <Form.Label>Номер контракта</Form.Label>
          <Form.Control
            value={contractNumber}
            onChange={e => setContractNumber(e.target.value)}
            placeholder="Номер контракта"/>
        </Form.Group>
        <Form.Group
          className="col-3"
          controlId="formContractDate">
          <Form.Label>Дата контракта</Form.Label>
          <Form.Control
            value={contractDate}
            onChange={e => setContractDate(e.target.value)}
            type="date"
            placeholder="Дата контракта"/>
        </Form.Group>
        <Form.Group
          className="col-3"
          controlId="formValidityContractDate">
          <Form.Label>Срок действия документа</Form.Label>
          <Form.Control
            value={validityContractDate}
            onChange={e => setValidityContractDate(e.target.value)}
            type="date"
            placeholder="Срок действия документа"/>
        </Form.Group>
        <Form.Group
          className="col-3"
          controlId="formOPFClient">
          <Form.Label>ОПФ клиента</Form.Label>
          <Form.Control
            value={opfClient}
            onChange={e => setOpfClient(e.target.value)}
            placeholder="Организационно-правовая форма клиента"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group
          className="col-3"
          controlId="formClientName">
          <Form.Label>ФИО клиента</Form.Label>
          <Form.Control
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="ФИО заказчика"/>
        </Form.Group>
        <Form.Group
          className="col-3"
          controlId="formClientNameGenitive">
          <Form.Label>Должность и ФИО клиента (род. падеж)</Form.Label>
          <Form.Control
            value={clientNameGenitive}
            onChange={e => setClientNameGenitive(e.target.value)}
            placeholder="Должность и ФИО клиента (род. падеж)"/>
        </Form.Group>
        <Form.Group
          className="col-3"
          controlId="formCustomerPosition">
          <Form.Label>Должность заказчика</Form.Label>
          <Form.Control
            value={customerPosition}
            onChange={e => setCustomerPosition(e.target.value)}
            placeholder="Должность заказчика"/>
        </Form.Group>
        <Form.Group className="col-3" controlId="formBase">
          <Form.Label>На основании</Form.Label>
          <Form.Control
            value={docBase}
            onChange={e => setDocBase(e.target.value)}
            placeholder="На основании"/>
        </Form.Group>

      </Row>
      <Row className="mb-4">
        <Form.Group className="col-3" controlId="formSignatoryFM">
          <Form.Label>Подписант ФМ</Form.Label>
          <Form.Select
            defaultValue={signatoryFM}
            onChange={e => setSignatoryFM(e.target.value)}>
            <option value={signatoryFM} disabled>Выберите</option>
            <option>Сиражева Светлана Валерьевна</option>
            <option>Бэнэвиз Маргарита Сергеевна</option>
            <option>Кравцова Виктория Александровна</option>
            <option>Разин Виктор Александрович</option>
            <option>Котенко Татьяна Викторовна</option>
            <option>Резник Андрей Витальевич</option>
          </Form.Select>
        </Form.Group>
        {
          (type === 'ltl' || type === 'pooling') &&
          <Form.Group className="col-3" controlId="formWarehouseType">
            <Form.Label>Доставка со склада</Form.Label>
            <Form.Select
              onChange={e => {
                setWarehouseType(e.target.value)
                setContractorWarehouse('')
                setCustomerWarehouse('')
              }}
              defaultValue={warehouseType}>
              <option value={warehouseType} disabled>Выберите</option>
              <option>Исполнителя</option>
              <option>Заказчика</option>
              <option>Исполнителя и заказчика</option>
            </Form.Select>
          </Form.Group>
        }
        {((type === 'ltl' || type === 'pooling') && (warehouseType === 'Исполнителя' || warehouseType === 'Исполнителя и заказчика')) &&
          <Form.Group className="col-3" controlId="formDocType">
            <Form.Label>Склад ФМ</Form.Label>
            <input className="form-control"
                   onChange={e => setContractorWarehouse(e.target.value)}
                   list="addressesDataList"
                   id="addressesDataListInput"
                   placeholder="Начните писать..."/>
            <datalist
              id="addressesDataList"
              defaultValue={''}>
              {addresses.map(element =>
                <option
                  key={element.searchName}
                  value={element.searchName}></option>)
              }
            </datalist>
          </Form.Group>
        }
        {((type === 'ltl' || type === 'pooling') && (warehouseType === 'Заказчика' || warehouseType === 'Исполнителя и заказчика')) &&
          <Form.Group
            className="col-3"
            controlId="formCustomerWarehouse">
            <Form.Label>Склад заказчика</Form.Label>
            <Form.Control
              value={customerWarehouse}
              onChange={e => setCustomerWarehouse(e.target.value)}
              placeholder="Склад заказчика"/>
          </Form.Group>
        }
        {(type === 'ftl' && mr) &&
          <Form.Group
            className="col-3"
            controlId="formCustomerWarehouse">
            <Form.Label>Адрес заказчика MR</Form.Label>
            <Form.Control
              value={customerWarehouseMR}
              onChange={e => setCustomerWarehouseMR(e.target.value)}
              placeholder="Склад заказчика"/>
          </Form.Group>
        }
        {(type === 'ftl' && mm) &&
          <Form.Group
            className="col-3"
            controlId="formCustomerWarehouse">
            <Form.Label>Адрес заказчика MM</Form.Label>
            <Form.Control
              value={customerWarehouseMM}
              onChange={e => setCustomerWarehouseMM(e.target.value)}
              placeholder="Склад заказчика"/>
          </Form.Group>
        }
      </Row>
      {
        type === 'pooling' &&
        <Row className="mb-4">
          <Form.Group
            className="col-3"
            controlId="formLtlNumber">
            <Form.Label>Номер приложения LTL</Form.Label>
            <Form.Control
              value={ltlNumber}
              onChange={e => setLtlNumber(e.target.value)}
              placeholder="Номер приложения LTL"/>
          </Form.Group>
          <Form.Group
            className="col-3"
            controlId="formLtlDate">
            <Form.Label>Дата приложения LTL</Form.Label>
            <Form.Control
              value={ltlDate}
              onChange={e => setLtlDate(e.target.value)}
              type="date"
              placeholder="Дата приложения LTL"/>
          </Form.Group>
        </Row>
      }
      <Row className="mb-3">
        {
          (type === 'ltl' || type === 'pooling') &&
          <Form.Group className="col-3" controlId="formWarehouseType">
            <Form.Label>Вес паллеты</Form.Label>
            <Form.Select
              onChange={e => setPalletWeight(e.target.value)}
              defaultValue={palletWeight}>
              <option value={palletWeight} disabled>Выберите</option>
              <option>650</option>
              <option>700</option>
              <option>750</option>
              <option>800</option>
              <option>850</option>
              <option>900</option>
            </Form.Select>
          </Form.Group>
        }
        {
          (type === 'ltl' || type === 'ftl') &&
          <Form.Group className="col-3" controlId="formWarehouseType">
            <Form.Label>Страхование рисков</Form.Label>
            <Form.Select
              onChange={e => setInsurance(e.target.value)}
              defaultValue={insurance}>
              <option value={insurance} disabled>Выберите</option>
              <option>страхование</option>
              <option>страхование в тарифе</option>
              <option>без страхования</option>
            </Form.Select>
          </Form.Group>
        }
      </Row>
      {
        type === 'ftl' &&
        <Row className="mb-4">
          <Form.Group className="col-3" controlId="moskowInside">
            <Form.Check
              onChange={() => setMr(!mr)}
              checked={mr}
              type="switch"
              id="moskowRegion"
              label="Москва - Регион"
            />
          </Form.Group>
          <Form.Group className="col-3" controlId="moskowInside">
            <Form.Check
              onChange={() => setMm(!mm)}
              checked={mm}
              type="switch"
              id="moskowInside"
              label="Внутри Москвы"
            />
          </Form.Group>
        </Row>
      }
      <Button variant="primary" onClick={sendFormData}>
        Сформировать ДС
      </Button>
    </Form>
  );
};

export default AgreementForm;
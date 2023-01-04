import React, { useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import PoolingCustomerStandard from './tables/PoolingCustomerStandard'
import PoolingAddCargo from './tables/PoolingAddCargo'
import PoolingPerformerStandard from './tables/PoolingPerformerStandart'

const PoolingTabs = ({sPRef, sCRef, addRef, sPRows, sCRows, addRows, iPoints, language}) => {

  const [key, setKey] = useState('standard-performer');

  return (
    <Tab.Container id="ftl-tabs" activeKey={key} onSelect={(key) => setKey(key)}>
      <Row className="mb-3">
        <Col>
          <Nav variant="pills" className="d-flex justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="standard-performer">Стандарт Исполнитель</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="standard-customer">Стандарт Заказчик</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="addCargo">Догруз</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tab.Content>
            <Tab.Pane eventKey="standard-performer">
              <PoolingPerformerStandard sPRef={sPRef} rows={sPRows} iPoints={iPoints} language={language}/>
            </Tab.Pane>
            <Tab.Pane eventKey="standard-customer">
              <PoolingCustomerStandard sCRef={sCRef} rows={sCRows} iPoints={iPoints} language={language}/>
            </Tab.Pane>
            <Tab.Pane eventKey="addCargo">
              <PoolingAddCargo addRef={addRef} rows={addRows} iPoints={iPoints} language={language}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default PoolingTabs;

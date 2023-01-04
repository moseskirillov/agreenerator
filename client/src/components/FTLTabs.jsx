import React, { useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import FTLInterCity from './tables/FTLInterCity'
import FTMoscow from './tables/FTLMoscow'
import FTLTander from './tables/FTLTander'

const FtlTabs = ({icRef, mRef, tRef, iRows, iPoints, mRows, tRows, language}) => {

  const [key, setKey] = useState('intercity');

  return (
    <Tab.Container id="ftl-tabs" activeKey={key} onSelect={(key) => setKey(key)}>
      <Row className="mb-3">
        <Col>
          <Nav variant="pills" className="d-flex justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="intercity">Межгород</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="moskow">Москва</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tander">Тандер</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tab.Content>
            <Tab.Pane eventKey="intercity">
              <FTLInterCity icRef={icRef} rows={iRows} points={iPoints} language={language}/>
            </Tab.Pane>
            <Tab.Pane eventKey="moskow">
              <FTMoscow mRef={mRef} rows={mRows} language={language}/>
            </Tab.Pane>
            <Tab.Pane eventKey="tander">
              <FTLTander tRef={tRef} rows={tRows} language={language}/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default FtlTabs;
import React, { useEffect, useRef, useState } from 'react';
import LTLTable from '../../components/tables/LTLTable'
import { Container } from 'react-bootstrap'
import Buttons from '../../components/Buttons'
import AgreementModal from '../../components/AgreementModal'
import { ruRU } from 'handsontable/i18n/index.d.ts'

const LtlPage = (
  {
    restoreDataRows,
    saveRowsHandler,
    submitFormHandler,
    showModal,
    setShowModal
  }) => {

  const hotRef = useRef(null)
  const [rows, setRows] = useState([[]])

  useEffect(() => {
    restoreDataRows('ltl')
    .then(response => {
      setRows(response)
    })
  }, [])

  return (
    <Container className="mt-3">
      <AgreementModal
        showModal={showModal}
        setShowModal={setShowModal}
        submitFormHandler={submitFormHandler}
        type={'ltl'}
      />
      <LTLTable
        hotRef={hotRef}
        rows={rows}
        language={ruRU.languageCode}
      />
      <Buttons
        saveHandler={() => saveRowsHandler(hotRef.current.hotInstance.getData(), 'ltl')}
        setShowModal={setShowModal}/>
    </Container>
  );
};

export default LtlPage;
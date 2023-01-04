import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap'
import FtlTabs from '../../components/FTLTabs'
import Buttons from '../../components/Buttons'
import AgreementModal from '../../components/AgreementModal'
import { ruRU } from 'handsontable/i18n/index.d.ts'

const FtlPage = (
  {
    points,
    restoreDataRows,
    saveRowsHandler,
    submitFormHandler,
    showModal,
    setShowModal
  }) => {

  const icRef = useRef(null)
  const mRef = useRef(null)
  const tRef = useRef(null)

  const [iRows, setIRows] = useState([[]])
  const [mRows, setMRows] = useState([[]])
  const [tRows, setTRows] = useState([[]])

  useEffect(() => {
    restoreDataRows('ftl')
    .then(response => {
      setIRows(response.intercity)
      setMRows(response.moskow)
      setTRows(response.tander)
    })
  }, [])

  return (
    <Container className="mt-3">
      <FtlTabs
        icRef={icRef}
        mRef={mRef}
        tRef={tRef}
        iRows={iRows}
        iPoints={points}
        mRows={mRows}
        tRows={tRows}
        language={ruRU.languageCode}
      />
      <Buttons saveHandler={() => {
        saveRowsHandler({
            intercity: icRef.current.hotInstance.getData(),
            moskow: mRef.current.hotInstance.getData(),
            tander: tRef.current.hotInstance.getData()
          }, 'ftl'
        )
      }} setShowModal={setShowModal}/>
      <AgreementModal
        showModal={showModal}
        setShowModal={setShowModal}
        submitFormHandler={submitFormHandler}
        type={'ftl'}
      />
    </Container>
  );
};

export default FtlPage;
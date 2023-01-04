import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap'
import PoolingTabs from '../../components/PoolingTabs'
import Buttons from '../../components/Buttons'
import AgreementModal from '../../components/AgreementModal'
import { ruRU } from 'handsontable/i18n/index.d.ts'

const PoolingPage = (
	{
		points,
		restoreDataRows,
		saveRowsHandler,
		submitFormHandler,
		showModal,
		setShowModal
	}) => {

	useEffect(() => {
		restoreDataRows('pooling')
		.then(response => {
			setSPRows(response.standardPerformer)
			setSCRows(response.standardCustomer)
			setAddRows(response.addCargo)
		})
	}, [])

	const sPRef = useRef(null)
	const sCRef = useRef(null)
	const addRef = useRef(null)

	const [sPRows, setSPRows] = useState([[]])
	const [sCRows, setSCRows] = useState([[]])
	const [addRows, setAddRows] = useState([[]])

	return (
		<Container className="mt-3">
			<PoolingTabs
				sPRef={sPRef}
				sCRef={sCRef}
				addRef={addRef}
				sPRows={sPRows}
				sCRows={sCRows}
				addRows={addRows}
				iPoints={points}
				language={ruRU.languageCode}
			/>
			<Buttons
				saveHandler={() => {
					saveRowsHandler({
						standardPerformer: sPRef.current.hotInstance.getData(),
						standardCustomer: sCRef.current.hotInstance.getData(),
						addData: addRef.current.hotInstance.getData()
					}, 'pooling')
				}}
				setShowModal={setShowModal}
			/>
			<AgreementModal
				showModal={showModal}
				setShowModal={setShowModal}
				submitFormHandler={submitFormHandler}
				type={'pooling'}
			/>
		</Container>
	);
};

export default PoolingPage;

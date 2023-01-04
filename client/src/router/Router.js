import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import LTLPage from '../pages/tables/LTLPage'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import Login from '../pages/Login'
import { FTL_PAGE, LOGIN_PAGE, LTL_PAGE, MAIN_PAGE, POOLING_PAGE, REGISTER_PAGE } from '../constants'
import ProtectedRoute from './ProtectedRoute'
import FTLPage from '../pages/tables/FTLPage'
import Logout from '../components/Logout'
import PoolingPage from '../pages/tables/PoolingPage'

const Router = ({points, restoreDataRows, saveRowsHandler, submitFormHandler, showModal, setShowModal}) => {
	return (
		<Routes>
			<Route path="*" element={<NotFound/>}/>
			<Route path="/" element={<Navigate to={MAIN_PAGE} replace/>}/>
			<Route element={<ProtectedRoute/>}>
				<Route path={MAIN_PAGE} element={
					<Logout>
						<LTLPage
							restoreDataRows={restoreDataRows}
							saveRowsHandler={saveRowsHandler}
							submitFormHandler={submitFormHandler}
							showModal={showModal}
							setShowModal={setShowModal}
						/>
					</Logout>
				}/>
				<Route path={LTL_PAGE} element={
					<Logout>
						<LTLPage
							restoreDataRows={restoreDataRows}
							saveRowsHandler={saveRowsHandler}
							submitFormHandler={submitFormHandler}
							showModal={showModal}
							setShowModal={setShowModal}
						/>
					</Logout>
				}/>
				<Route path={FTL_PAGE} element={
					<Logout>
						<FTLPage
							points={points}
							restoreDataRows={restoreDataRows}
							saveRowsHandler={saveRowsHandler}
							submitFormHandler={submitFormHandler}
							showModal={showModal}
							setShowModal={setShowModal}
						/>
					</Logout>
				}/>
				<Route path={POOLING_PAGE} element={
					<Logout>
						<PoolingPage
							points={points}
							restoreDataRows={restoreDataRows}
							saveRowsHandler={saveRowsHandler}
							submitFormHandler={submitFormHandler}
							showModal={showModal}
							setShowModal={setShowModal}
						/>
					</Logout>
				}/>
			</Route>
			<Route path={REGISTER_PAGE} element={<Logout><Register/></Logout>}/>
			<Route path={LOGIN_PAGE} element={<Login/>}/>
		</Routes>
	);
};

export default Router;

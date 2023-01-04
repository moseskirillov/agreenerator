import Router from './router/Router'
import Header from './components/Header'
import 'handsontable/dist/handsontable.full.min.css'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/slices/user'
import { useLocation, useNavigate } from 'react-router-dom'
import { AUTH_CHECK, LOGIN_PAGE, REGISTER_PAGE } from './constants'
import React, { useEffect, useState } from 'react'
import { authInstance, instance } from './axios'
import jwtDecode from 'jwt-decode'
import { useAuth } from './hooks/UseAuth'
import { registerAllModules } from 'handsontable/registry'
import { registerLanguageDictionary, ruRU } from 'handsontable/i18n/index.d.ts'
import ToastStatus from './components/ToastStatus'

const App = () => {

  registerAllModules()
  registerLanguageDictionary(ruRU)

  const {isAuth} = useAuth()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [points, setPoints] = useState([])
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    getPoints()
    .then(points =>
      setPoints(points))

    checkLogin()
    .then(response => {
      if (response.data.token) {
        loginHandler(response.data.token)
      } else {
        logoutHandler()
      }
    })
    .catch(error => {
      console.error(error)
      logoutHandler()
    })
  }, [])

  const checkLogin = async () => {
    if (localStorage.getItem('token')) {
      return await authInstance.get(AUTH_CHECK)
    }
  }

  const loginHandler = (token) => {
    localStorage.setItem('token', token)
    const {email} = jwtDecode(token)
    dispatch(login({
      email: email,
      token: token,
      isAuth: true
    }))
  }

  const logoutHandler = () => {
    localStorage.clear()
    dispatch(logout())
    if (location.pathname !== REGISTER_PAGE) {
      navigate(LOGIN_PAGE)
    }
  }

  const getPoints = async () => {
    try {
      const result = await instance.get('/rows/intercity/points')
      if (result.data.points) {
        return result.data.points
      } else {
        showToastHandle('Ошибка получения списка городов')
      }
    } catch (error) {
      showToastError(error)
    }
  }

  const showToastHandle = (data) => {
    setMessage(data)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  const showToastError = (error, defaultText = 'Произошла ошибка') => {
    if (error.response.data.error) {
      showToastHandle(error.response.data.error)
    } else {
      showToastHandle(defaultText)
    }
  }

  const restoreDataRows = async (type) => {
    try {
      const rows = await authInstance.get('/rows/get', {params: {type: type}})
      if (type === 'ftl') {
        return {
          intercity: rows.data.data.intercity,
          moskow: rows.data.data.moskow,
          tander: rows.data.data.tander
        }
      }
      if (type === 'ltl') {
        return rows.data.data
      }
      if (type === 'pooling') {
        return {
          standardPerformer: rows.data.data.standardPerformer,
          standardCustomer: rows.data.data.standardCustomer,
          addCargo: rows.data.data.addCargo
        }
      }
    } catch (error) {
      showToastError(error)
    }
  }

  const saveRowsHandler = async (data, type) => {
    try {
      const response = await authInstance.post('/rows/save', {type: type, data: data})
      showToastHandle(response.data.result)
    } catch (error) {
      showToastError(error)
    }
  }

  const submitFormHandler = async (data, type) => {
    try {
      const response = await authInstance.post('/generator/agreement/generate', {data: data, type: type})
      showToastHandle(response.data.result)
    } catch (error) {
      showToastError(error)
    }
  }

  return (
    <>
      <Header
        logout={logoutHandler}
        isAuth={isAuth}
      />
      <Router
        points={points}
        restoreDataRows={restoreDataRows}
        saveRowsHandler={saveRowsHandler}
        submitFormHandler={submitFormHandler}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <ToastStatus
        showToast={showToast}
        setShowToast={setShowToast}
        message={message}
      />
    </>
  );
}

export default App;
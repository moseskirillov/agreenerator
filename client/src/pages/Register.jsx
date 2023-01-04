import React, { useState } from 'react';
import { instance } from '../axios'
import RegisterForm from '../components/RegisterForm'
import { REGISTER_POST } from '../constants'

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleRegister = async () => {
    try {
      await instance.post(REGISTER_POST, {email, password})
      setSuccess(true)
      setEmail('')
      setPassword('')
      setTimeout(() => (setSuccess(false)), 10000)
    } catch (error) {
      if (error.response.data.error) {
        setErrors(error.response.data.error)
      } else {
        setErrors('Произошла ошибка')
      }
      setShowAlert(true)
    }
  }

  return (
    <RegisterForm
      handleRegister={handleRegister}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      errors={errors}
      success={success}
    />
  );
};

export default Register;
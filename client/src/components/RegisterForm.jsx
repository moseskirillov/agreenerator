import React from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegisterForm = ({
                        handleRegister,
                        email,
                        setEmail,
                        password,
                        setPassword,
                        showAlert,
                        setShowAlert,
                        errors,
                        success
                      }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}>
      <Card style={{width: 500}} className="p-5">
        <h2 className="m-auto">Регистрация</h2>
        <Form className="mt-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              required
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setShowAlert(false)}
            />
            <Alert show={showAlert} variant="warning" className="mb-3">
              {errors}
            </Alert>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Alert show={success} variant="success" className="mb-3">
            Регистрация прошла успешно. {<Link to={'/lsc-team/agreenerator/login'}>Нажмите</Link>}, чтобы перейти на
            страницу
            авторизации.
          </Alert>
          <Button
            variant="primary"
            onClick={handleRegister}
          >
            Зарегистрироваться
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterForm;
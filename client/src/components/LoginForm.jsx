import React from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'

const LoginForm = ({
                     handleLogin,
                     email,
                     setEmail,
                     password,
                     setPassword,
                     showAlert,
                     setShowAlert,
                     errors
                   }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center"
               style={{height: window.innerHeight - 54}}>
      <Card style={{width: 500}} className="p-5">
        <h2 className="m-auto">Авторизация</h2>
        <Form className="mt-5" autoComplete="on">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              required
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setShowAlert(false)}
            />
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
          <Alert show={showAlert} variant="danger" className="mb-3">
            {errors}
          </Alert>
          <Button variant="primary" onClick={handleLogin}>
            Войти
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginForm;
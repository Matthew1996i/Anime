import React, { useState } from 'react';
import axios from 'axios';

import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt, faUser } from '@fortawesome/free-solid-svg-icons';

import { LoginContainer, LoginContent, Logo, LogoContent } from './styles';

const Login = () => {
  const [useData, setData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const captureDataLogin = (e) => {
    const { id } = e.target;
    setData({
      ...useData,
      [id]: e.target.value,
    });
  };

  const createUser = () => {
    axios.post('http://localhost:3000/user/create', useData)
      .then(resp => console.log(resp))
      .catch(error => console.log(error));
  };

  return (
    <LoginContainer>
      <LoginContent>
        <LogoContent>
          <Logo />
        </LogoContent>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={captureDataLogin}
              type="text"
              placeholder="Seu nome"
              aria-label="name"
              id="name"
              aria-describedby="basic-addon1"
              value={useData.name}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon icon={faAt} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={captureDataLogin}
              type="email"
              placeholder="E-mail"
              aria-label="Email"
              id="email"
              aria-describedby="basic-addon1"
              value={useData.email}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={captureDataLogin}
              type="password"
              placeholder="Password"
              aria-label="Password"
              id="password"
              aria-describedby="basic-addon1"
              value={useData.password}
            />
          </InputGroup>
          <Button onClick={createUser} className="btn btn-success">
            <span>Criar uma conta</span>
          </Button>
        </Form>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;

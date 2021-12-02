import React, { useState } from 'react';
import axios from 'axios';

import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import urlConfig from '../../router/urlConfig';
import history from '../../router/history';

import {
  LoginContainer,
  LoginContent,
  Logo,
  LogoContent,
  CreateAccontButton,
  MessageLabel,
} from './styles';

const Login = () => {
  const baseURL = urlConfig[urlConfig.enviroment.api].api;

  const [useData, setData] = useState({
    email: '',
    password: '',
  });
  const [useMessage, setMessage] = useState({
    message: '',
    type: '',
    color: '',
  });

  const captureDataLogin = (e) => {
    const { type } = e.target;
    if (useMessage.message) {
      setMessage({
        message: '',
        type: '',
        color: '',
      });
    }

    setData({
      ...useData,
      [type]: e.target.value,
    });
  };

  function doLogin() {
    if (!useData.email) return setMessage({ message: 'Por favor, informe o email', type: 'warning', color: '#ed717d' });
    if (!useData.password) return setMessage({ message: 'Por favor, informe a senha', type: 'warning', color: '#ed717d' });

    return axios.post(`${baseURL}/user/login`, {
      email: useData.email,
      password: useData.password,
    })
      .then((result) => {
        const { message } = result.data;
        return setMessage({ message: message, type: 'warning', color: '#ed717d' });
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <LoginContainer>
      <LoginContent>
        <LogoContent>
          <Logo />
        </LogoContent>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faAt} />
            </InputGroup.Text>
            <FormControl
              onChange={captureDataLogin}
              type="email"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              value={useData.email}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faKey} />
            </InputGroup.Text>
            <FormControl
              onChange={captureDataLogin}
              type="password"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              value={useData.password}
            />
          </InputGroup>
          <MessageLabel>
            <p type={useMessage.type} color={useMessage.color}>{useMessage.message}</p>
          </MessageLabel>
          <Button onClick={() => doLogin()}>
            <FontAwesomeIcon icon={faSignInAlt} />
            <span>Log in</span>
          </Button>
        </Form>
        <CreateAccontButton onClick={() => history.push('/signup')}>
          Criar uma conta
        </CreateAccontButton>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;

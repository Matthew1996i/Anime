import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';


import history from '../../router/history';
import api from '../../services/api';

import { LoginContainer,
  LoginContent,
  Logo,
  LogoContent,
  CreateAccontButton,
  MessageLabel } from './styles';

const Login = () => {
  const thisState = useSelector(state => state);
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

  async function doLogin() {
    const { email, password } = await useData;

    if (!email) return setMessage({ message: 'Por favor, informe o email', type: 'warning', color: '#ed717d' });
    if (!password) return setMessage({ message: 'Por favor, informe a senha', type: 'warning', color: '#ed717d' });

    return api.post('/user/login', { email, password })
      .then(async (userCredential) => {
        if (userCredential.data.message === 'Incorrect password or email') return setMessage({ message: 'Senha incorreta!', type: 'warning', color: '#ed717d' });
        if (userCredential.data.message === 'User not found') return setMessage({ message: 'Usuario não encontrado!', type: 'warning', color: '#ed717d' });

        const { token } = await userCredential.data;

        await localStorage.setItem('@anime-control', JSON.stringify({ token }));

        return history.push('/user/dashboard');
      })
      .catch((error) => {
        if (error) return setMessage({ message: 'Erro ao efetuar o login', type: 'warning', color: '#ed717d' });

        return error;
      });
  }

  console.log(thisState);

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
              onKeyUp={e => (e.key === 'Enter' ? doLogin() : '')}
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
              aria-describedby="basic-addon1F"
              value={useData.password}
              onKeyUp={e => (e.key === 'Enter' ? doLogin() : '')}
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

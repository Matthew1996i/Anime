import React, { useState } from 'react';
import axios from 'axios';

import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

// import { collection, getDocs } from 'firebase/firestore';
// import db from '../../services/firebase/firestore';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import urlConfig from '../../router/urlConfig';
import history from '../../router/history';
import config from '../../services/firebase/firebase-config';

import { LoginContainer,
  LoginContent,
  Logo,
  LogoContent,
  CreateAccontButton,
  MessageLabel } from './styles';

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
    const auth = getAuth(config);

    if (!useData.email) return setMessage({ message: 'Por favor, informe o email', type: 'warning', color: '#ed717d' });
    if (!useData.password) return setMessage({ message: 'Por favor, informe a senha', type: 'warning', color: '#ed717d' });

    return signInWithEmailAndPassword(auth, useData.email, useData.password)
      .then((userCredential) => {
        const { user } = userCredential;
        const { uid } = user;

        axios.post(`${baseURL}/user/login`, {
          body: {
            uid,
          },
        })
          .then(resp => localStorage.setItem('anime-control', JSON.stringify({ token: resp.data.token })))
          .catch(error => error);
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === 'auth/user-not-found') return setMessage({ message: 'Usuário não encontrado!', type: 'warning', color: '#ed717d' });
        if (errorCode === 'auth/wrong-password') return setMessage({ message: 'Senha incorreta!', type: 'warning', color: '#ed717d' });

        return errorCode;
      });
  }

  // useEffect(async () => {
  //   const querySnapshot = await getDocs(collection(db, 'users'));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //   });
  // }, []);

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
                <FontAwesomeIcon icon={faAt} />
              </InputGroup.Text>
            </InputGroup.Prepend>
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

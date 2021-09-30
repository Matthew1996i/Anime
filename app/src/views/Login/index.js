import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { collection, getDocs } from 'firebase/firestore';
import db from '../../services/firebase/firestore';


import { LoginContainer, LoginContent, Logo, LogoContent } from './styles';

const Login = () => {
  const [useData, setData] = useState({
    email: '',
    password: '',
  });

  const captureDataLogin = (e) => {
    const { type } = e.target;
    setData({
      ...useData,
      [type]: e.target.value,
    });
  };

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  }, []);

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
          <span>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="/signup">Criar uma conta</Link>
          </span>
          <Button>
            <FontAwesomeIcon icon={faSignInAlt} />
            <span>Log in</span>
          </Button>
        </Form>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;

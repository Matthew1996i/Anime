import React from 'react'
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faAt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import { LoginContainer, LoginContent, Logo, LogoContent } from './styles'

const Login = () => {
  return(
    <LoginContainer>
      <LoginContent>
        <LogoContent>
          <Logo/>
        </LogoContent>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon icon={faAt} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='email'
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon icon={faKey} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='password'
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Button>
            <FontAwesomeIcon icon={faSignInAlt} />
            <span>Log in</span>
          </Button>
        </Form>
      </LoginContent>
    </LoginContainer>
  )
}

export default Login
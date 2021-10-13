import React from 'react';
import PropTypes, { object } from 'prop-types';

import { Nav } from 'react-bootstrap';

import history from '../../router/history';

import { SidebarContainer,
  Logo,
  NavBar,
  Profile,
  NavBarItens } from './styles';
import defaultImage from '../../assets/images/defaultProfile/img_profile_avatar_animals_llama_circ.png';

export default function Sidebar({ userInfo }) {
  function logOut() {
    localStorage.removeItem('anime-control');
    history.push('/');
  }

  return (
    <SidebarContainer>
      <Logo />
      <NavBar>
        <Profile>
          <img src={defaultImage} alt="" />
          <h2>{userInfo.displayName}</h2>
        </Profile>
        <NavBarItens>
          <Nav.Item onClick={() => history.push('/user/dashboard')}>
            Dashboard
          </Nav.Item>
          <hr />
          <Nav.Item onClick={() => logOut()} className="btn-logout">
            Sair
          </Nav.Item>
        </NavBarItens>
      </NavBar>
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  userInfo: PropTypes.objectOf(object),
}.isRequired;

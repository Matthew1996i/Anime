import React from 'react';
import PropTypes, { object } from 'prop-types';

import { SidebarContainer, Logo, NavBar, Profile } from './styles';
import defaultImage from '../../assets/images/defaultProfile/img_profile_avatar_animals_llama_circ.png';

export default function Sidebar({ userInfo }) {
  return (
    <SidebarContainer>
      <Logo />
      <NavBar>
        <Profile>
          <img src={defaultImage} alt="" />
          <h2>{userInfo.displayName}</h2>
        </Profile>
      </NavBar>
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  userInfo: PropTypes.objectOf(object),
}.isRequired;

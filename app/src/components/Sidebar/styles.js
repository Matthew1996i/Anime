import styled from 'styled-components';
import LogoImage from '../../assets/images/newlogo.png';

export const SidebarContainer = styled.div`
  background-color: white;
  height: 100%;
  border-right: 1px solid #dfdfdf;
`;

export const Logo = styled.div`
  background-image: url(${LogoImage});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100px;
  cursor: pointer;
`;

export const NavBar = styled.nav`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const NavBarItens = styled.ul`
  padding: 0;
  font-size: 0.9rem;

  .nav-item {
    list-style: none;
    width: 100%;
    padding: 10px;
    color: #262626;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
  }

  .nav-item:hover {
    background-color: #262626;
    color: #fff;
    cursor: pointer;
  }

  hr {
    margin-top: 55vh;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
  margin-bottom: 80px;

  img {
    width: 60px;
    height: 60px;
    border: 1px solid #dfdfdf;
    border-radius: 50px;
    margin-right: 15px;
  }

  h2 {
    font-size: 1.2rem;
    color: #747474;
  }
`;

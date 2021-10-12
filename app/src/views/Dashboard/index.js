import React, { useEffect, useState } from 'react';
import axios from 'axios';

import urlConfig from '../../router/urlConfig';

import Sidebar from '../../components/Sidebar';

import { SideBarArea, ContentArea, DashBoardContainer } from './styles';

export default function Dashboard() {
  const baseURL = urlConfig[urlConfig.enviroment.api].api;

  const [userInfo, setUserInfo] = useState();

  async function getUser() {
    const localItem = localStorage.getItem('anime-control');

    const objectLocal = JSON.parse(localItem);

    const headers = {
      authorization: `Bearer ${objectLocal.token}`,
    };

    axios.post(`${baseURL}/user/getuser`, {}, {
      headers,
    })
      .then(resp => setUserInfo({
        ...resp.data,
      }))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DashBoardContainer>
      <SideBarArea>
        <Sidebar userInfo={userInfo} />
      </SideBarArea>
      <ContentArea>
        <h1>Seu navegador não está carregando... está pagina simplesmente está incompleta!</h1>
      </ContentArea>
    </DashBoardContainer>
  );
}

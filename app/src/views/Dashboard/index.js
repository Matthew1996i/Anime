/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import Sidebar from '../../components/Sidebar';

import { SideBarArea, ContentArea, DashBoardContainer } from './styles';

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState({});

  if (!userInfo) return <p>loading...</p>;

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

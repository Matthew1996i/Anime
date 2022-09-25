import React, { useState } from 'react';

import Sidebar from '../../components/Sidebar';

import { SideBarArea, ContentArea, DashBoardContainer } from './styles';

export default function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState({
    displayName: '',
  });

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

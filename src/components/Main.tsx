import * as React from 'react';
import styled from '@emotion/styled';
import { About, Alnylam, RGG, Grubhub, LevelUp, Amalgam, Launch, Photography, Contact } from './Pages';

const MainContainer = styled.div`
  height: 100%;
  scroll-snap-type: y proximity;
  max-height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;

  @media screen and (min-width: 700px){
    font-size: calc(45px + 0.08vw);
  }
`;

export const Main = () => {
  return (
    <MainContainer>
      <About />
      <Alnylam />
      <RGG />
      <Grubhub />
      <LevelUp />
      <Amalgam />
      <Launch />
      <Photography />
      <Contact />
    </MainContainer>
  );
};

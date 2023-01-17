import * as React from 'react';
import { SideNav } from './components/SideNav';
import { Main } from './components/Main';
import { ChaptersContextProvider, } from './hooks/useChapters';

function Portfolio(): React.ReactElement {
  return (
    <ChaptersContextProvider chapter={ 'about' }>
      <SideNav/>
      <Main />
    </ChaptersContextProvider>
  );
}

export default Portfolio;

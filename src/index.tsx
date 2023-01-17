import React from 'react';
import ReactDOM from 'react-dom/client';
import { css, Global, ThemeProvider } from '@emotion/react';
import Portfolio from './Portfolio';
import QuattrocentoSansRegular from './fonts/QuattrocentoSans/QuattrocentoSansRegular.ttf';
import { Theme } from './Theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const globalStyles = css`
  @font-face {
    font-family: 'Quattrocento Sans';
    src: url(${QuattrocentoSansRegular}) format('opentype');
  }

  html,
  body {
    font-family: 'Quattrocento Sans', sans-serif;
    box-sizing: border-box;
    height: 100%;
    margin: 0;
  }
  
  a {
    text-decoration: none;
  }
}`;


root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <Global styles={globalStyles} />
      <Portfolio />
    </ThemeProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { css, Global, ThemeProvider } from '@emotion/react';
import Portfolio from './Portfolio';
import { Theme } from './Theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const globalStyles = css`
    html,
    body {
        font-family: 'Space Grotesk', sans-serif;
        box-sizing: border-box;
        height: 100%;
        margin: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Lora', serif;
        font-weight: 600;
    }

    a {
        text-decoration: none;
    }
`;

root.render(
    <React.StrictMode>
        <ThemeProvider theme={Theme}>
            <Global styles={globalStyles} />
            <Portfolio />
        </ThemeProvider>
    </React.StrictMode>
);

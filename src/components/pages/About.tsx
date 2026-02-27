import * as React from 'react';
import styled from '@emotion/styled';
import { HelloBlob } from '../HelloBlob';
import headshot from '../../images/about.jpg';
import { Headshot } from '../animation';
import { BlackText, Page, darkGlass } from '../Atoms';

const AboutText = styled(BlackText)`
    display: flex;
    width: 600px;
    max-width: 90vw;
    ${darkGlass}
`;

const helloStrings: string[] = [
    ' ',
    'Hello!',
    '你好!',
    'Salut!',
    '안녕!',
    'Bonjour!',
    'привет!',
    'Hola!',
    'नमस्ते!',
    "What's good?",
];

export const About = () => {
    const [appear, setAppear] = React.useState(false);
    const [headshotLoad, setHeadshotLoad] = React.useState(false);
    const [popOut, setPopOut] = React.useState(false);
    const [popIn, setPopIn] = React.useState(false);

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            setAppear(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            setHeadshotLoad(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const pageId = 'about';

    return (
        <Page pageId={pageId} key={`${pageId}_pagekey`}>
            <Headshot
                img={headshot}
                appear={appear}
                popOut={popOut}
                popIn={popIn}
                onMouseEnter={() => {
                    setPopOut(true);
                    setPopIn(false);
                }}
                onMouseLeave={() => {
                    setPopOut(false);
                    setPopIn(true);
                }}
                className={headshotLoad ? 'loaded' : ''}
            />
            <div style={{ display: 'flex', flexDirection: 'column', zIndex: 2 }}>
                <div style={{ paddingLeft: '32px', marginBottom: '-60px' }}>
                    <HelloBlob morphTime={1} cooldownTime={0.75} strings={helloStrings} />
                </div>
                <AboutText>
                    My name is Dickson Lau and I&#39;m a software developer from the proud city of Boston.
                </AboutText>
            </div>
        </Page>
    );
};

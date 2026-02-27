import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Shine, Bubbles } from '../animation';
import { WhiteText, Page, Logo, brightGlass } from '../Atoms';

const warpStreak = keyframes`
    0% { transform: scaleX(1) translateX(0); filter: blur(0) brightness(1); }
    30% { transform: scaleX(1.6) translateX(8px); filter: blur(4px) brightness(1.8); }
    60% { transform: scaleX(1.6) translateX(-8px); filter: blur(4px) brightness(1.8); }
    100% { transform: scaleX(1) translateX(0); filter: blur(0) brightness(1); }
`;

const RGGLogo = styled(Logo)`
    &:hover {
        animation: ${warpStreak} 0.5s ease-out;
    }
`;

const RGGText = styled(WhiteText)`
    ${brightGlass}
`;

export const RGG = () => {
    const pageId = 'rgg';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <RGGLogo src={process.env.PUBLIC_URL + '/images/logos/RueGiltGroupe.png'} alt="RGG" />
            <RGGText className="left">
                Before that I was with <Shine href="http://www.ruegiltgroupe.com/">Rue Gilt Groupe</Shine> cranking out
                countless of features for{' '}
                <Bubbles link="https://www.ruelala.com/" word="Rue La La" color="#FF3065" bubbleColor="#D64066B3" /> and{' '}
                <Bubbles link="https://www.gilt.com/" word="Gilt" color="#FFB400" bubbleColor="#E1B95BB3" />
            </RGGText>
        </Page>
    );
};

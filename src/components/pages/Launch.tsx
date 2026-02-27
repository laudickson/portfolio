import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Typing } from '../animation';
import { WhiteText, Page, Logo } from '../Atoms';

const floatBob = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
`;

const LaunchLogo = styled(Logo)`
    &:hover {
        animation: ${floatBob} 1s ease-in-out infinite;
    }
`;

export const Launch = () => {
    const pageId = 'launch';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <LaunchLogo src={process.env.PUBLIC_URL + '/images/logos/Launch.png'} alt="Launch" />
            <WhiteText className="left">
                But really, this all started with the incredible experience at the{' '}
                <Typing link="https://www.launchacademy.com" word="coding bootcamp" /> that I attended.
            </WhiteText>
        </Page>
    );
};

import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes, useTheme } from '@emotion/react';
import { Dang } from '../animation';
import { BlackText, Page, Logo } from '../Atoms';

const spinGrow = keyframes`
    0% { transform: rotate(0deg) scale(1); }
    70% { transform: rotate(360deg) scale(1); }
    100% { transform: rotate(360deg) scale(1.3); }
`;

const AmalgamLogo = styled(Logo)`
    &:hover {
        animation: ${spinGrow} 0.8s ease-out forwards;
    }
`;

export const Amalgam = () => {
    const pageId = 'amalgam';
    const theme = useTheme();
    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <BlackText className="right">
                Many, many summers ago, I had a brief stint at{' '}
                <Dang link="http://amalgam.co" word="Amalgam" color={theme.colors.pages.amalgam} /> constructing
                websites from concepts.
            </BlackText>
            <AmalgamLogo src={process.env.PUBLIC_URL + '/images/logos/Amalgam.png'} alt="Amalgam" />
        </Page>
    );
};

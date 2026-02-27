import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes, useTheme } from '@emotion/react';
import { Chomp } from '../animation';
import { BlackText, Page, Logo } from '../Atoms';

const jelly = keyframes`
    0% { transform: scale(1, 1); }
    25% { transform: scale(0.92, 1.08); }
    50% { transform: scale(1.08, 0.92); }
    75% { transform: scale(0.97, 1.03); }
    100% { transform: scale(1, 1); }
`;

const GrubhubLogo = styled(Logo)`
    &:hover {
        animation: ${jelly} 0.6s ease;
    }
`;

export const Grubhub = () => {
    const pageId = 'grubhub';
    const theme = useTheme();

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <BlackText className="right">
                And even prior to that, I was a part of{' '}
                <Chomp
                    link="https://www.grubhub.com"
                    word="Grubhub"
                    color={theme.colors.pages.grubhub}
                    toothColor="#e96973"
                />{' '}
                for a brief time during an acquisition of a smaller company.
            </BlackText>
            <GrubhubLogo src={process.env.PUBLIC_URL + '/images/logos/Grubhub.png'} alt="Grubhub" />
        </Page>
    );
};

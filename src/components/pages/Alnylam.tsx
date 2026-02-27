import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Twirl } from '../animation';
import { BlackText, Page, Logo, frostedGlass } from '../Atoms';

const glowPulse = keyframes`
    0%, 100% { filter: drop-shadow(0 0 4px rgb(255, 255, 255)); }
    50% { filter: drop-shadow(0 0 50px rgb(44, 44, 44)) drop-shadow(0 0 20px rgba(245, 245, 255, 1)); }
`;

const FrostedText = styled(BlackText)`
    ${frostedGlass}
`;

const AlnylamLogo = styled(Logo)`
    &:hover {
        animation: ${glowPulse} 1.5s ease infinite;
    }
`;

export const Alnylam = () => {
    const pageId = 'alnylam';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <FrostedText className="right">
                I&#39;ve made a return to biotech, working at <Twirl link="http://alnylam.com" word="Alnylam" /> to
                build internal tools for research and development.
            </FrostedText>
            <AlnylamLogo src={process.env.PUBLIC_URL + '/images/logos/Alnylam.png'} alt="Alnylam" />
        </Page>
    );
};

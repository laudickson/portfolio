import * as React from 'react';
import styled from '@emotion/styled';
import { LetterPop } from '../animation';
import { WhiteText, Page, Logo } from '../Atoms';

const LevelUpLogo = styled(Logo)`
    &:hover {
        transform: rotateY(360deg);
        transition: transform 0.6s ease;
    }
`;

export const LevelUp = () => {
    const pageId = 'levelUp';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <LevelUpLogo src={process.env.PUBLIC_URL + '/images/logos/LevelUp.png'} alt="LevelUp" />
            <WhiteText className="left">
                That mighty company was called <LetterPop link="https://www.thelevelup.com/" word="LevelUp" /> where I
                spent a good amount of time writing Ruby on Rails.
            </WhiteText>
        </Page>
    );
};

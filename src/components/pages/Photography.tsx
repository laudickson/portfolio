import * as React from 'react';
import { FocusLens } from '../animation';
import { Automagick } from '../Automagick';
import { WhiteText, Page } from '../Atoms';

export const Photography = () => {
    const pageId = 'photography';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <Automagick />
            <WhiteText className="right text-shadow">
                I love to wander and travel. Sometimes I&#39;ll take{' '}
                <FocusLens href="https://www.flickr.com/photos/mrsushiman/" target="_blank" rel="noreferrer">
                    pictures
                </FocusLens>{' '}
                of people, places, and things.
            </WhiteText>
        </Page>
    );
};

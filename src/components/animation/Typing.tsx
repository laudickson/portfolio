import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from '../Atoms';
import { ReactTyped } from 'react-typed';
import type { Link as LinkProps } from './types';

const TypingLink = styled(Link)`
    position: relative;
    color: black;

    .launch {
        transition: 0.3s ease-in;
    }

    &:hover {
        .launch {
            opacity: 0.1;
            transition: 0.3s ease-out;
        }
    }

    .typed-launch {
        position: absolute;
        top: -2px;
        color: white;
        background: rgba(0, 0, 0, 0.7);
        left: 0;
        border-radius: 4px;

        > .typed-cursor {
            color: #39ff14;
        }
    }
`;

export const Typing = ({ link, word }: LinkProps) => {
    const [hover, setHover] = React.useState(false);

    return (
        <TypingLink
            href={link}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <span className="launch">{word}</span>
            {hover && (
                <ReactTyped
                    className="typed-launch"
                    strings={[word]}
                    typeSpeed={75}
                    startDelay={0}
                    backSpeed={25}
                    backDelay={500}
                    loop={true}
                />
            )}
        </TypingLink>
    );
};

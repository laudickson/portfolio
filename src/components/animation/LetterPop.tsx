import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from '../Atoms';
import type { Link as LinkProps } from './types';

const LetterPopWord = styled(Link)`
    position: relative;
    color: black;
    display: inline-block;
    vertical-align: bottom;
    z-index: 1;
    user-select: none;
    overflow: hidden;
    will-change: opacity, transform;
    transition: 0.4s linear;

    &:visited {
        color: black;
    }

    &::after {
        content: '';
        display: block;
        position: absolute;
        background: white;
        width: 30px;
        height: 100%;
        left: 30px;
        top: 0;
        opacity: 0;
        filter: blur(2px);
        transform: translateX(-120px) skewX(50deg);
        transition: 0.4s linear;
    }

    &:hover {
        color: white;
        text-shadow: 0 0 7px white;
        transition: 0.7s ease-out;

        &::after {
            transform: translateX(320px) skewX(50deg);
            opacity: 1;
            transition: 0.6s ease-in;
        }

        span {
            animation-name: pop;
        }
    }

    @keyframes badgeShine {
        20% {
            opacity: 1;
        }

        100% {
            transform: translateX(150px) skewX(50deg);
            opacity: 1;
        }
    }
`;

const PopLetter = styled.span<{ idx: number }>`
    display: inline-block;
    animation-delay: calc(${(props) => props.idx} * 0.2s);
    animation-direction: normal;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes pop {
        10% {
            transform: translateY(-25%);
        }
        20% {
            transform: translateY(0);
        }
    }
`;

export const LetterPop = ({ link, word }: LinkProps) => {
    const splitWord = [...word];

    return (
        <LetterPopWord href={link} target="_blank" rel="noreferrer">
            {splitWord.map((letter, idx) => (
                <PopLetter key={Math.random()} idx={idx}>
                    {letter}
                </PopLetter>
            ))}
        </LetterPopWord>
    );
};

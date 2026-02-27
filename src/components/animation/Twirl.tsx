import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from '../Atoms';
import type { Link as LinkProps } from './types';

const TwirlWord = styled(Link)`
    transition: color 0.3s ease-in;
    color: white;

    &:hover {
        color: black;
        transition: color 0.9s ease-out;

        span {
            animation-name: twirl;
            animation-direction: normal;
            animation-duration: 3000ms;
            animation-timing-function: linear;
            &:hover {
                color: white;
            }
        }
    }

    @keyframes twirl {
        2.5% {
            transform: rotateY(1turn);
        }
        5% {
            transform: rotateY(2turn);
        }
        10% {
            transform: rotateY(3turn);
        }
        20% {
            transform: rotateY(4turn);
        }
        40% {
            transform: rotateY(5turn);
        }
        70%,
        100% {
            transform: rotateY(6turn);
        }
    }
`;

const TwirlChar = styled.span<{ idx: number }>`
    display: inline-block;
    animation-delay: calc(${(props) => props.idx} * 0.025s);
`;

export const Twirl = ({ link, word }: LinkProps): React.ReactElement => {
    const splitWord = [...word];

    return (
        <TwirlWord href={link} target="_blank" rel="noreferrer">
            {splitWord.map((letter, idx) => (
                <TwirlChar key={Math.random()} idx={idx}>
                    {letter}
                </TwirlChar>
            ))}
        </TwirlWord>
    );
};

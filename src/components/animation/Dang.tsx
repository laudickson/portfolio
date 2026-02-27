import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from '../Atoms';
import type { Link as LinkProps } from './types';

const DangLink = styled(Link)<{ word: string; color: string }>`
    position: relative;
    color: white;
    display: inline-block;
    transition: all 0.2s ease-out;

    &:after {
        content: '${(props) => props.word}';
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        z-index: -1;
        text-shadow: none;
        background-image: linear-gradient(45deg, transparent 30%, white 30%, white 60%, transparent 0);
        background-size: 10px 10px;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all 0.3s ease-out;
    }

    &:hover {
        color: ${(props) => props.color};
        transition: all 0.4s ease-in;
        text-shadow: 0 0 4px black;

        &::after {
            animation: dang-shadow 15s linear infinite;
            transition: all 0.4s linear;
            opacity: 1;
            transform: scale(1.5);
        }
    }

    @keyframes dang-shadow {
        0% {
            background-position: 0 0;
        }
        0% {
            background-position: 100% -100%;
        }
    }
`;

export const Dang = ({ link, word, color }: LinkProps) => {
    return (
        <DangLink href={link} word={word} color={color ?? ''}>
            {word}
        </DangLink>
    );
};

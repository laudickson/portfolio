import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from '../Atoms';
import type { Link as LinkProps } from './types';

const ChompContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const BiteGroup = styled.div<{ x: number; y: number; rot: number }>`
    position: absolute;
    z-index: 2;
    pointer-events: none;
    width: 56px;
    height: 56px;
    left: -14px;
    top: -14px;
    transform: ${(props) => `translate(${props.x}px, ${props.y}px) rotate(${props.rot}deg)`};
`;

const JawTop = styled.div<{ color: string; delay: number }>`
    position: absolute;
    width: 100%;
    height: 50%;
    top: 0;
    background: color-mix(in srgb, ${(props) => props.color} 65%, black);
    border-radius: 50% 50% 0 0;
    opacity: 0;
    transform: translateY(-10px);
    animation: snapTop 0.3s ease-out forwards;
    animation-delay: ${(props) => props.delay}ms;

    &::after {
        content: '';
        position: absolute;
        left: 10%;
        bottom: -40%;
        width: 80%;
        height: 70%;
        background: ${(props) => props.color};
        clip-path: polygon(5% 0%, 16% 100%, 27% 0%, 37% 0%, 48% 100%, 60% 0%, 70% 0%, 82% 100%, 93% 0%);
    }

    @keyframes snapTop {
        0% {
            transform: translateY(-10px);
            opacity: 0;
        }
        30% {
            opacity: 1;
        }
        80% {
            transform: translateY(-2px);
            opacity: 1;
        }
        100% {
            transform: translateY(-4px);
            opacity: 1;
        }
    }
`;

const JawBottom = styled.div<{ color: string; delay: number }>`
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
    background: color-mix(in srgb, ${(props) => props.color} 65%, black);
    border-radius: 0 0 50% 50%;
    opacity: 0;
    transform: translateY(10px);
    animation: snapBottom 0.3s ease-out forwards;
    animation-delay: ${(props) => props.delay}ms;

    &::after {
        content: '';
        position: absolute;
        left: 10%;
        top: -40%;
        width: 80%;
        height: 70%;
        background: ${(props) => props.color};
        clip-path: polygon(5% 100%, 16% 0%, 27% 100%, 37% 100%, 48% 0%, 60% 100%, 70% 100%, 82% 0%, 93% 100%);
    }

    @keyframes snapBottom {
        0% {
            transform: translateY(10px);
            opacity: 0;
        }
        30% {
            opacity: 1;
        }
        80% {
            transform: translateY(2px);
            opacity: 1;
        }
        100% {
            transform: translateY(4px);
            opacity: 1;
        }
    }
`;

const ChompLink = styled(Link)<{ color: string }>`
    display: inline-block;
    position: relative;
    color: white;
    transition: 0.2s linear;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scaleX(0);
        transform-origin: bottom left;
        background: white;
        z-index: -1;
        transition: 0.2s ease-out;
        border-radius: 4px;
    }

    &:hover {
        color: ${(props) => props.color};
        transition: 0.3s ease-in;

        &::after {
            transform: scaleX(1);
        }
    }
`;

export const Chomp = ({ link, word, color, toothColor }: LinkProps & { toothColor?: string }) => {
    const [bite, setBite] = React.useState(false);
    const tc = toothColor ?? color ?? '';

    return (
        <ChompContainer onMouseEnter={() => setBite(true)} onMouseLeave={() => setBite(false)}>
            {bite && (
                <>
                    <BiteGroup x={-4} y={1} rot={323}>
                        <JawTop color={tc} delay={500} />
                        <JawBottom color={tc} delay={500} />
                    </BiteGroup>
                    <BiteGroup x={170} y={25} rot={51}>
                        <JawTop color={tc} delay={750} />
                        <JawBottom color={tc} delay={750} />
                    </BiteGroup>
                    <BiteGroup x={87} y={60} rot={171}>
                        <JawTop color={tc} delay={1200} />
                        <JawBottom color={tc} delay={1200} />
                    </BiteGroup>
                </>
            )}
            <ChompLink href={link} color={color ?? ''} target="_blank" rel="noreferrer" className={bite ? 'eat' : ''}>
                {word}
            </ChompLink>
        </ChompContainer>
    );
};

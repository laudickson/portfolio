import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from '../Atoms';
import type { Link as LinkProps } from './types';

interface Bubbly {
    bubbleColor: string;
    idx: number;
    randomInitial: number;
    randomFinalX: number;
    randomFinalY: number;
}

const BubblesContainer = styled(Link)<{ color: string }>`
    color: ${(props) => props.color};
    opacity: 0.4;
    transition: 1s ease;
    position: relative;

    &:hover {
        opacity: 1;
        text-shadow: 0 0 10px ${(props) => props.color};
    }
`;

const Bubble = styled.span<Bubbly>`
  background-color: ${(props) => props.bubbleColor};
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  border-radius: 50%;
  z-index: -1
  transform: scale(0);
  opacity: 0;

  &:nth-of-type(odd) {
    border: solid 2px ${(props) => props.bubbleColor};
    background-color: transparent;
  }

  &.bubbly-${(props) => props.idx} {
    animation: sparkle-${(props) => props.idx} 2s ${(props) => (props.idx + 1) / 40}s;
    left: ${(props) => props.randomInitial}%;

    @keyframes sparkle-${(props) => props.idx} {
      0% {
        transform: scale(1);
        opacity: .4;
      }

      50% {
        opacity: 1;
      }

      100% {
        left: ${(props) => props.randomFinalX}px;
        top: ${(props) => props.randomFinalY}px;
        transform: scale(0);
        opacity: 0;
      }
    }
  }
`;

export const Bubbles = ({ link, word, color, bubbleColor }: LinkProps & { bubbleColor: string }) => {
    const bubbles = new Array(50).fill(0);
    const [bubbly, setBubbly] = React.useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setBubbly(false);
        }, 2500);

        return () => clearTimeout(timeout);
    }, [bubbly]);

    return (
        <BubblesContainer href={link} color={color ?? 'white'} onMouseEnter={() => setBubbly(true)}>
            {word}
            {bubbles.map((_, idx) => (
                <Bubble
                    key={idx}
                    idx={idx}
                    randomInitial={Math.floor(Math.random() * 100) + 1}
                    randomFinalX={Math.floor(Math.random() * 500) + 1 - 250}
                    randomFinalY={Math.floor(Math.random() * 500) + 1 - 250}
                    bubbleColor={bubbleColor}
                    className={bubbly ? `bubbly-${idx}` : undefined}
                />
            ))}
        </BubblesContainer>
    );
};

import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from './Atoms';
import { ReactTyped } from 'react-typed';

interface Link {
    link: string;
    word: string;
    color?: string;
}

interface Bubbly {
    bubbleColor: string;
    idx: number;
    randomInitial: number;
    randomFinalX: number;
    randomFinalY: number;
}

export const Headshot = styled.div<{ img: string; appear: boolean; popOut: boolean; popIn: boolean }>`
    @media screen and (max-width: 500px) {
        display: none;
    }

    height: 80%;
    width: 30%;
    margin-right: 16px;
    opacity: ${(props) => (props.appear ? 0.6 : 0)};
    box-shadow: 0 0 8px 40px white inset, 0 0 0 0 grey;
    background-image: ${(props) => (props.img ? `url(${props.img})` : 'none')};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 40px;
    transition: opacity 2s ease-in;

    &.loaded {
        ${(props) =>
            props.popOut
                ? `
        animation: popout forwards;
        animation-duration: .5s;
        animation-timing-function: ease-out;

        @keyframes popout {
          0% { box-shadow: 0 0 8px 40px white inset, 0 0 0 0 grey; };
          50% { box-shadow: 0 0 0 0 white inset, 0 0 0 0px grey };
          100% {
            box-shadow: 0 0 0 0 white inset, 0 0 20px 2px grey;
            opacity: .8;
          };
        }
      `
                : ''}
        ${(props) =>
            props.popIn
                ? `
      animation: popin forwards;
      animation-duration: .5s;
      animation-timing-function: ease-out;

      @keyframes popin {
        0% { box-shadow: 0 0 0 0 white inset, 0 0 20px 2px grey; opacity: .8; };
        10% { box-shadow: 0 0 0 0 white inset, 0 0 0 0px grey };
        100% { box-shadow: 0 0 8px 40px white inset, 0 0 0 0 grey; };
      }
      `
                : ''}
    }
`;

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

export const Twirl = ({ link, word }: Link): React.ReactElement => {
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

export const Shine = styled(Link)`
    position: relative;
    text-shadow: 0 0 8px silver;
    background-position: 0;
    background: linear-gradient(to right, #4d4d4d 0, white 10%, #4d4d4d 20%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;
    animation: shine 3s infinite linear;
    transition: text-shadow 0.4s ease-out;

    &:hover {
        text-shadow: 0 0 1px white;
    }

    &::before,
    &::after {
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background: #fff;
        content: '';
        opacity: 0;
        transition: opacity 0.3s, transform 0.5s;
    }

    &::before {
        top: 0;
        transform: translateX(-20px);
    }

    &::after {
        bottom: 0;
        transform: translateX(20px);
    }

    &:hover::before,
    &:hover::after {
        opacity: 1;
        transform: translateX(0px);
    }

    @keyframes shine {
        0% {
            background-position: 0;
        }
        100% {
            background-position: 320px;
        }
    }
`;

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

export const Bubbles = ({ link, word, color, bubbleColor }: Link & { bubbleColor: string }) => {
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

const ChompContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const Tooth = styled.div<{ color: string }>`
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: ${(props) => props.color};
    pointer-events: none;

    &.bite1 {
        left: 34px;
        top: 15px;
    }
    &.bite2 {
        left: 29px;
        top: 29px;
    }
    &.bite3 {
        left: 19px;
        top: 38px;
    }
    &.bite4 {
        left: 4px;
        top: 31px;
    }
    &.bite5 {
        left: -6px;
        top: 15px;
    }
`;

const Bite = styled.div<{ color: string; x: number; y: number; rot: number; eat: number }>`
    position: absolute;
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    left: -9px;
    top: -9px;
    height: 40px;
    width: 40px;
    border-radius: 30px;
    background: ${(props) => props.color};
    transform: ${(props) => `translate(${props.x}px, ${props.y}px) rotate(${props.rot}deg)`};
    animation: chomp 0.3s forwards ease-out;
    animation-delay: ${(props) => props.eat}ms;

    @keyframes chomp {
        100% {
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

export const Chomp = ({ link, word, color }: Link) => {
    const bites = [...Array.from({ length: 5 }, (_, i) => i + 1)];
    const [bite, setBite] = React.useState(false);

    return (
        <ChompContainer onMouseEnter={() => setBite(true)} onMouseLeave={() => setBite(false)}>
            {bite && (
                <>
                    <Bite color={color ?? ''} x={1} y={-3} rot={323} eat={500}>
                        {bites.map((bite) => (
                            <Tooth key={Math.random()} className={`bite${bite}`} color={color ?? ''} />
                        ))}
                    </Bite>
                    <Bite color={color ?? ''} x={154} y={6} rot={51} eat={750}>
                        {bites.map((bite) => (
                            <Tooth key={Math.random()} className={`bite${bite}`} color={color ?? ''} />
                        ))}
                    </Bite>
                    <Bite color={color ?? ''} x={87} y={43} rot={171} eat={1200}>
                        {bites.map((bite) => (
                            <Tooth key={Math.random()} className={`bite${bite}`} color={color ?? ''} />
                        ))}
                    </Bite>
                </>
            )}
            <ChompLink href={link} color={color ?? ''} target="_blank" rel="noreferrer" className={bite ? 'eat' : ''}>
                {word}
            </ChompLink>
        </ChompContainer>
    );
};

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

export const LetterPop = ({ link, word }: Link) => {
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

export const Dang = ({ link, word, color }: Link) => {
    return (
        <DangLink href={link} word={word} color={color ?? ''}>
            {word}
        </DangLink>
    );
};

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

export const Typing = ({ link, word }: Link) => {
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

export const FocusLens = styled(Link)`
    text-shadow: 0px 0px 4px black;
    color: black;

    &:hover {
        animation: focusLens 0.8s forwards ease-in-out;
    }

    @keyframes focusLens {
        25% {
            color: transparent;
        }
        50% {
            text-shadow: 0px 0px 8px #eaeaea;
        }
        100% {
            text-shadow: 0px 0px 4px #eaeaea;
            color: black;
        }
    }
`;

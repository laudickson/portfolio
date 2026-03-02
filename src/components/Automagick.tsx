import * as React from 'react';
import styled from '@emotion/styled';

import { Pictures } from '../images/Pictures';

const Mural = styled.div`
    position: absolute;
    display: flex;
    top: 0;
    left: 60px;
    width: 3240px;
    flex-wrap: wrap;

`;

const Cell = styled.div`
    position: relative;
    width: 270px;
    height: 360px;

    img {
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid black;
        transition: opacity 1s ease-in-out;
    }
`;

const Veil = styled.div<{ color: string }>`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 60px;
    z-index: 1;
    background-color: ${(props) => props.color};
    opacity: 0.42;

    @media screen and (max-width: 500px) {
        left: 0;
    }
`;

type Picture = (typeof Pictures)[number];

export const Automagick = () => {
    const shuffled = React.useMemo(
        () =>
            Pictures.map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value),
        [],
    );

    const [cells, setCells] = React.useState(() =>
        shuffled.slice(0, 60).map((pic) => ({ current: pic, outgoing: null as Picture | null })),
    );
    const visibleRef = React.useRef(shuffled.slice(0, 60));
    const poolRef = React.useRef(shuffled.slice(60));

    const fadeOut = React.useCallback((el: HTMLImageElement | null) => {
        if (el) {
            requestAnimationFrame(() => {
                el.style.opacity = '0';
            });
        }
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const swapIndex = Math.floor(Math.random() * visibleRef.current.length);
            const poolIndex = Math.floor(Math.random() * poolRef.current.length);
            const outgoing = visibleRef.current[swapIndex];
            const incoming = poolRef.current[poolIndex];
            visibleRef.current[swapIndex] = incoming;
            poolRef.current[poolIndex] = outgoing;

            setCells((prev) => {
                const next = [...prev];
                next[swapIndex] = { current: incoming, outgoing };
                return next;
            });
            setTimeout(() => {
                setCells((prev) => prev.map((cell) => ({ ...cell, outgoing: null })));
            }, 1200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Veil color="#cccccc" />
            <Veil color="black" />
            <Mural>
                {cells.map((cell, i) => (
                    <Cell key={i}>
                        <img src={cell.current.image} width="270" height="360" />
                        {cell.outgoing && (
                            <img ref={fadeOut} src={cell.outgoing.image} width="270" height="360" />
                        )}
                    </Cell>
                ))}
            </Mural>
        </>
    );
};

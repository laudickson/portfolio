/* eslint-disable no-debugger */
import * as React from 'react';
import styled from '@emotion/styled';

interface HelloBlobProps {
    morphTime: number;
    cooldownTime: number;
    strings: string[];
}

const BlobContainer = styled.div`
    filter: url(#threshold) blur(0.6px);
    position: relative;
    white-space: pre;
    height: 80px;
`;

const HelloWord = styled.span`
    position: absolute;
    font-size: 1.3em;
    user-select: none;
`;

const InkBlob = styled.svg`
    height: 1px;
`;

export const HelloBlob = ({ morphTime, cooldownTime, strings }: HelloBlobProps) => {
    const textIndex = React.useRef(strings.length - 1);
    const time = React.useRef(new Date().getTime());
    const morph = React.useRef(0);
    const cooldown = React.useRef(cooldownTime);

    const wordRef1 = React.useRef<HTMLSpanElement>(null);
    const wordRef2 = React.useRef<HTMLSpanElement>(null);

    const requestRef = React.useRef(0);

    if (wordRef1.current && wordRef2.current) {
        wordRef1.current.textContent = strings[textIndex.current % strings.length];
        wordRef2.current.textContent = strings[(textIndex.current + 1) % strings.length];
    }

    React.useEffect(() => {
        function doMorph() {
            morph.current -= cooldown.current;
            cooldown.current = 0;

            let fraction = morph.current / morphTime;

            if (fraction > 1) {
                cooldown.current = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        }

        function setMorph(fraction: number) {
            if (wordRef1.current && wordRef2.current) {
                wordRef2.current.style.filter = `blur(${Math.min(3 / fraction - 3, 100)}px)`;

                wordRef2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

                fraction = 1 - fraction;

                wordRef1.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
                wordRef1.current.style.opacity = `${Math.pow(fraction, 0.2) * 100}%`;

                wordRef1.current.textContent = strings[textIndex.current % strings.length];
                wordRef2.current.textContent = strings[(textIndex.current + 1) % strings.length];
            }
        }

        function doCooldown() {
            morph.current = 0;
            if (wordRef1.current && wordRef2.current) {
                wordRef2.current.style.filter = '';
                wordRef2.current.style.opacity = '100%';

                wordRef1.current.style.filter = '';
                wordRef1.current.style.opacity = '0%';
            }
        }

        const animate = () => {
            if (textIndex.current < strings.length * 2 - 1) {
                requestRef.current = requestAnimationFrame(animate);
            }

            const newTime = new Date();
            const shouldIncrementIndex = cooldown.current > 0;
            const dt = (newTime.getTime() - time.current) / 1000;
            time.current = newTime.getTime();

            cooldown.current -= dt;

            if (cooldown.current <= 0) {
                if (shouldIncrementIndex) {
                    textIndex.current++;
                }

                doMorph();
            } else {
                doCooldown();
            }
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [strings, cooldownTime, morphTime]);

    return (
        <>
            <BlobContainer style={{ willChange: 'filter' }}>
                <HelloWord ref={wordRef1} />
                <HelloWord ref={wordRef2} />
            </BlobContainer>

            <InkBlob id="filters">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </InkBlob>
        </>
    );
};

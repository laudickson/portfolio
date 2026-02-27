import * as React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { useChapters } from '../hooks/useChapters';
import useOnScreen from '../hooks/useOnScreen';

const StyledPage = styled.div<{ background: ChapterIds }>`
    position: relative;
    scroll-snap-align: start;
    background: ${(props) => (props.background ? props.theme.colors.pages[props.background] : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
`;

export const Logo = styled.img`
    @media screen and (max-width: 500px) {
        display: none;
    }
    transition: 0.3s ease-out;
`;

export const Link = styled.a`
    white-space: pre;
`;

const shineRight = keyframes`
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
`;

const shineLeft = keyframes`
    from { transform: translateX(100%); }
    to { transform: translateX(-100%); }
`;

const shineDown = keyframes`
    from { transform: translateY(-100%); }
    to { transform: translateY(100%); }
`;

const shineUp = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(-100%); }
`;

const shineDirections = ['right', 'left', 'down', 'up'] as const;

const StyledText = styled.div`
    position: relative;
    display: block;
    width: 40%;
    max-width: 800px;
    min-width: min(320px, calc(100% - 40px));
    line-height: 160%;
    white-space: pre-line;
    z-index: 2;

    /* Glassmorphism */
    background-color: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px) saturate(1.4);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    border-top: 1px solid rgba(255, 255, 255, 0.35);
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 32px;
    box-shadow:
        0 8px 32px 0 rgba(0, 0, 0, 0.15),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
        inset 0 -1px 0 0 rgba(0, 0, 0, 0.05);
    margin: 20px;
    transition:
        transform 0.3s ease-out,
        box-shadow 0.3s ease,
        background-color 0.3s ease;
    transform-style: preserve-3d;
    will-change: transform;

    overflow: hidden;

    &:hover {
        background-color: rgba(255, 255, 255, 0.15);
        box-shadow:
            0 12px 40px 0 rgba(0, 0, 0, 0.2),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
            inset 0 -1px 0 0 rgba(0, 0, 0, 0.05);
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 30%,
            rgba(255, 255, 255, 0.25) 45%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.25) 55%,
            transparent 70%,
            transparent 100%
        );
        transform: translateX(-100%);
        pointer-events: none;
    }

    &[data-shine='right']::after {
        animation: ${shineRight} 0.6s ease;
    }
    &[data-shine='left']::after {
        animation: ${shineLeft} 0.6s ease;
    }
    &[data-shine='down']::after,
    &[data-shine='up']::after {
        inset: 0 -50%;
        background-image: linear-gradient(
            30deg,
            transparent 0%,
            transparent 30%,
            rgba(255, 255, 255, 0.25) 45%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.25) 55%,
            transparent 70%,
            transparent 100%
        );
    }
    &[data-shine='down']::after {
        animation: ${shineDown} 0.3s ease;
    }
    &[data-shine='up']::after {
        animation: ${shineUp} 0.3s ease;
    }

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        opacity: 0.085;
        mix-blend-mode: overlay;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        background-size: 128px 128px;
    }

    .typed-span {
        font-size: 1.3em;
        line-height: 1.3em;
        white-space: nowrap;
        margin-bottom: 40px;
    }

    &.right {
        @media screen and (min-width: 500px) {
            text-align: right;
            margin-right: 60px;
        }
    }

    &.left {
        @media screen and (min-width: 500px) {
            margin-left: 60px;
        }
    }

    &.center-text {
        @media screen and (min-width: 500px) {
            text-align: center;
        }
    }

    &.text-shadow {
        text-shadow: 1px 1px 2px black;
    }
`;

const TILT_MAX = 10;

const Text = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof StyledText>>(function Text(
    { onMouseEnter, onMouseMove, onMouseLeave, onAnimationEnd, ...props },
    ref
) {
    const innerRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = innerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            el.style.transform = `perspective(800px) rotateX(${-y * TILT_MAX}deg) rotateY(${x * TILT_MAX}deg)`;
            onMouseMove?.(e);
        },
        [onMouseMove]
    );

    const handleMouseLeave = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = innerRef.current;
            if (el) el.style.transform = '';
            onMouseLeave?.(e);
        },
        [onMouseLeave]
    );

    return (
        <StyledText
            {...props}
            ref={(node) => {
                (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            onMouseEnter={(e) => {
                const dir = shineDirections[Math.floor(Math.random() * shineDirections.length)];
                e.currentTarget.setAttribute('data-shine', dir);
                onMouseEnter?.(e);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onAnimationEnd={(e) => {
                e.currentTarget.removeAttribute('data-shine');
                onAnimationEnd?.(e);
            }}
        />
    );
});

export const BlackText = styled(Text)`
    color: black;
`;

export const WhiteText = styled(Text)`
    color: white;
`;

export const darkGlass = css`
    background-color: rgba(182, 182, 182, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.45);
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
        0 8px 32px 0 rgba(0, 0, 0, 0.4),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: rgba(255, 255, 255, 0.18);
        box-shadow:
            0 12px 40px 0 rgba(0, 0, 0, 0.5),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);
    }

    &::after {
        background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 30%,
            rgba(0, 0, 0, 0.08) 45%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0.08) 55%,
            transparent 70%,
            transparent 100%
        );
    }
`;

export const brightGlass = css`
    background-color: rgb(119, 119, 119, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-right: 1px solid rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    box-shadow:
        0 8px 32px 0 rgba(0, 0, 0, 0.08),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 0 rgba(0, 0, 0, 0.04);

    &:hover {
        background-color: rgb(119, 119, 119, 0.16);
        box-shadow:
            0 12px 40px 0 rgba(0, 0, 0, 0.12),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 0 rgba(0, 0, 0, 0.04);
    }

    &::after {
        background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 30%,
            rgba(255, 255, 255, 0.15) 45%,
            rgba(255, 255, 255, 0.25) 50%,
            rgba(255, 255, 255, 0.15) 55%,
            transparent 70%,
            transparent 100%
        );
    }
`;

export const Page = ({ children, pageId }: PageProps) => {
    const { chapters, setChapters } = useChapters();
    const page = chapters.refs[pageId];
    const onScreen = useOnScreen(page.ref);

    React.useEffect(() => {
        if (onScreen) {
            setChapters((prev) => {
                if (prev.current === page.title) return prev;
                return {
                    ...prev,
                    current: page.title,
                };
            });
        }
    }, [onScreen, page.title, setChapters]);

    return (
        <StyledPage id={`${pageId}Page`} background={pageId} ref={page.ref}>
            {children}
        </StyledPage>
    );
};

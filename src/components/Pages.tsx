import * as React from 'react';
import styled from '@emotion/styled';
import { AiFillLinkedin, AiFillGithub, AiFillMail, AiOutlinePaperClip } from 'react-icons/ai';
import { HelloBlob } from './HelloBlob';
import headshot from '../images/about.jpg';
import { Bubbles, Shine, Headshot, Twirl, Chomp, LetterPop, Dang, Typing, FocusLens } from './Animation';
import { BlackText, WhiteText, Page, Logo } from './Atoms';
import { useTheme } from '@emotion/react';
import { Automagick } from './Automagick';

const AboutText = styled(BlackText)`
    display: flex;
`;

const helloStrings: string[] = [
    ' ',
    'Hello!',
    '你好!',
    'Salut!',
    '안녕!',
    'Bonjour!',
    'привет!',
    'Hola!',
    'नमस्ते!',
    "What's good?",
];

export const About = () => {
    const [appear, setAppear] = React.useState(false);
    const [headshotLoad, setHeadshotLoad] = React.useState(false);
    const [popOut, setPopOut] = React.useState(false);
    const [popIn, setPopIn] = React.useState(false);

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            setAppear(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            setHeadshotLoad(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const pageId = 'about';

    return (
        <Page pageId={pageId} key={`${pageId}_pagekey`}>
            <Headshot
                img={headshot}
                appear={appear}
                popOut={popOut}
                popIn={popIn}
                onMouseEnter={() => {
                    setPopOut(true);
                    setPopIn(false);
                }}
                onMouseLeave={() => {
                    setPopOut(false);
                    setPopIn(true);
                }}
                className={headshotLoad ? 'loaded' : ''}
            />
            <AboutText>
                <HelloBlob morphTime={1} cooldownTime={0.75} strings={helloStrings} />
                My name is Dickson Lau and I&#39;m a software developer from the proud city of Boston.
            </AboutText>
        </Page>
    );
};

export const Alnylam = () => {
    const pageId = 'alnylam';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <BlackText className="right">
                I&#39;ve made a return to biotech, working at <Twirl link="http://alnylam.com" word="Alnylam" /> to
                build internal tools for research and development.
            </BlackText>
            <Logo src={process.env.PUBLIC_URL + '/images/logos/Alnylam.png'} alt="Alnylam" />
        </Page>
    );
};

export const RGG = () => {
    const pageId = 'rgg';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <Logo src={process.env.PUBLIC_URL + '/images/logos/RueGiltGroupe.png'} alt="RGG" />
            <WhiteText className="left">
                Before that I was with <Shine href="http://www.ruegiltgroupe.com/">Rue Gilt Groupe</Shine> cranking out
                countless of features for{' '}
                <Bubbles link="https://www.ruelala.com/" word="Rue La La" color="#FF3065" bubbleColor="#D64066B3" /> and{' '}
                <Bubbles link="https://www.gilt.com/" word="Gilt" color="#FFB400" bubbleColor="#E1B95BB3" />
            </WhiteText>
        </Page>
    );
};

export const Grubhub = () => {
    const pageId = 'grubhub';
    const theme = useTheme();

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <BlackText className="right">
                And even prior to that, I was a part of{' '}
                <Chomp link="https://www.grubhub.com" word="Grubhub" color={theme.colors.pages.grubhub} /> for a brief
                time during an acquisition of a smaller company.
            </BlackText>
            <Logo src={process.env.PUBLIC_URL + '/images/logos/Grubhub.png'} alt="Grubhub" />
        </Page>
    );
};

export const LevelUp = () => {
    const pageId = 'levelUp';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <Logo src={process.env.PUBLIC_URL + '/images/logos/LevelUp.png'} alt="LevelUp" />
            <WhiteText className="left">
                That mighty company was called <LetterPop link="https://www.thelevelup.com/" word="LevelUp" /> where I
                spent a good amount of time writing Ruby on Rails.
            </WhiteText>
        </Page>
    );
};

export const Amalgam = () => {
    const pageId = 'amalgam';
    const theme = useTheme();
    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <BlackText className="right">
                Many, many summers ago, I had a brief stint at{' '}
                <Dang link="http://amalgam.co" word="Amalgam" color={theme.colors.pages.amalgam} /> constructing
                websites from concepts.
            </BlackText>
            <Logo src={process.env.PUBLIC_URL + '/images/logos/Amalgam.png'} alt="Amalgam" />
        </Page>
    );
};

export const Launch = () => {
    const pageId = 'launch';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <Logo src={process.env.PUBLIC_URL + '/images/logos/Launch.png'} alt="Launch" />
            <WhiteText className="left">
                But really, this all started with the incredible experience at the{' '}
                <Typing link="https://www.launchacademy.com" word="coding bootcamp" /> that I attended.
            </WhiteText>
        </Page>
    );
};

export const Photography = () => {
    const pageId = 'photography';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <Automagick />
            <WhiteText className="right text-shadow">
                I love to wander and travel. Sometimes I&#39;ll take{' '}
                <FocusLens href="https://www.flickr.com/photos/mrsushiman/" target="_blank" rel="noreferrer">
                    pictures
                </FocusLens>{' '}
                of people, places, and things.
            </WhiteText>
        </Page>
    );
};

export const Contact = () => {
    const pageId = 'contact';

    return (
        <Page pageId={pageId} key={`${pageId}_page`}>
            <ContactContainer>
                <ContactLabel title="github" link="https://github.com/laudickson">
                    <AiFillGithub />
                </ContactLabel>
                <ContactLabel title="linkedin" link="https://linkedin.com/in/laudickson">
                    <AiFillLinkedin />
                </ContactLabel>
                {/* <ContactLabel title='Blog'><AiFillCloud /></ContactLabel> */}
                <ContactLabel title="email" link="mailto:kr.d.tsl@gmail.com">
                    <AiFillMail />
                </ContactLabel>
                <ContactLabel title="resume" link="/resume.pdf">
                    <AiOutlinePaperClip />
                </ContactLabel>
            </ContactContainer>
        </Page>
    );
};

const ContactContainer = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-between;
    @media screen and (max-width: 500px) {
        flex-direction: column;
        gap: 36px;
    }

    a {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        border-radius: 4px;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: scaleX(0);
            z-index: 1;
            transform-origin: bottom center;
            background: white;
            transition: 0.2s ease-out;
            border-radius: 4px;
        }

        &:hover {
            span,
            svg {
                color: black;
                transition: 0.4s ease-out;
            }

            &::after {
                transform: scaleX(1);
            }
        }

        span,
        svg {
            color: white;
            z-index: 2;
        }

        span {
            padding-left: 4px;
            font-size: calc(20px + 0.08vw);
        }

        svg {
            font-size: 24px;
        }
    }
`;

const ContactLabel = ({ children, title, link }: { children: React.ReactNode; title: string; link: string }) => {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            {children}
            <span>{title}</span>
        </a>
    );
};

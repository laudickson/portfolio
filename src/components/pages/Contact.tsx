import * as React from 'react';
import styled from '@emotion/styled';
import { AiFillLinkedin, AiFillGithub, AiFillMail, AiOutlinePaperClip } from 'react-icons/ai';
import { Page } from '../Atoms';

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

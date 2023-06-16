import * as React from 'react';
import styled from '@emotion/styled';
import { useChapters } from '../hooks/useChapters';
import useOnScreen from '../hooks/useOnScreen';

const StyledPage = styled.div<{ background: ChapterIds }>`
  position: relative;
  scroll-snap-align: start;
  background: ${props => props.background ? props.theme.colors.pages[props.background] : 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Logo = styled.img`
  @media screen and (max-width:500px) {
    display: none;
  }

  &:hover {
    animation: grow .4s ease forwards;
  }

  @keyframes grow {
    100% {
      transform: scale(1.3);
    }
  }
`;

export const Link = styled.a`
  white-space: pre;
`;

const Text = styled.div`
  display: inline;
  flex-direction: column;
  width: 30%;
  max-width: 600px;
  min-width: 320px;
  line-height: 120%;
  white-space: pre-line;
  z-index: 2;

  .typed-span {
    font-size: 1.3em;
    line-height: 1.3em;
    white-space: nowrap;
    margin-bottom: 40px;
  }

  &.right {
    @media screen and (min-width:500px) {
      text-align: right;
      margin-right: 60px;
    }
  }

  &.left {
    @media screen and (min-width:500px) {
      margin-left: 60px;
    }
  }

  &.center-text {
    @media screen and (min-width:500px) {
      text-align: center;
    }
  }

  &.text-shadow {
    text-shadow: 1px 1px 2px black;
  }
`;

export const BlackText = styled(Text)`
  color: black;
`;

export const WhiteText = styled(Text)`
  color: white;
`;

export const Page = ({ children, pageId }: PageProps) => {
  const { chapters, setChapters } = useChapters();
  const page = chapters.refs[pageId];
  const onScreen = useOnScreen(page.ref);

  React.useEffect(() => {
    onScreen && setChapters(
      {
        ...chapters,
        current: page.title
      }
    );
  }, [onScreen]);

  return (
    <StyledPage id={ `${pageId}Page` } background={ pageId } ref={ page.ref }>
      { children }
    </StyledPage>
  );
};

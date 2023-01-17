import * as React from 'react';
import styled from '@emotion/styled';
import { useChapters } from '../hooks/useChapters';

const Chapters = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  width: 100%;

  transform: translateX(-100%);
  opacity: 0;
  transition: .3s ease-out;
`;

export const Chapter = styled.a`
  position: relative;
  color: white;
  padding: 8px 0;
  cursor: pointer;

  &::before {
    position: absolute;
    height: 0;
    top: 60%;
    left: 50%;
    visibility: hidden;
    content: '•';
    text-shadow: 0 0 transparent;
    font-size: 1.2em;
    transition: text-shadow 0.7s, color 0.3s;
    transform: translateX(-50%);
    background-color: #fff;
  }

  &:hover::before, &:focus::before {
    visibility: visible;
    color: #fff;
    text-shadow: 10px 0 #fff, -10px 0 #fff;
  }
`;

const CurrentChapter = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  color: white;
  min-width: 200px;
  transform: rotate(270deg) translateY(-70px);
  opacity: 1
  transition: opacity .2s ease-in .2s, transform .1s linear;
  line-height: 60px;
  cursor: default;
`;

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  min-width: ${props => props.theme.spacing.sideNav.collapsed};
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${props => props.theme.colors.black};
  z-index: 9999;
  overflow: hidden;
  transition: .3s ease;
  font-size: 1.5em;
  opacity: 0;
  animation: fadeNav 1s forwards;

  @media screen and (max-width:500px) {
    display: none;
  }

  &:hover{
    min-width: ${props => props.theme.spacing.sideNav.expanded};

    .chapters {
      transform: translateX(0);
      opacity: 1;
    }

    .current-chapter {
      opacity: 0;
      transition: opacity .15s ease-out, transform .1s linear .25s;
    }
  }

  @keyframes fadeNav {
    from { opacity: 0 };
    to { opacity: 1 };
  }
`;

export const SideNav = () => {
  const { chapters, setChapters } = useChapters();
  const currentChapterRef = React.useRef<HTMLSpanElement>(null);

  const goToChapter = (e: React.MouseEvent, chapter: ChapterType ) => {
    e.preventDefault;

    setChapters({
      ...chapters,
      current: chapter.title
    });
    chapter.ref.current?.scrollIntoView();
  };

  return (
    <NavContainer>
      <Chapters className='chapters'>
        { Object.values(chapters.refs).map(chapter =>
          <Chapter onClick={ e => goToChapter(e, chapter) } key={ `${chapter.title}_chapter`}
          >
            { chapter.title }
          </Chapter>
        )}
      </Chapters>
      <CurrentChapter className='current-chapter' ref={ currentChapterRef }>
        { chapters.current }
      </CurrentChapter>
    </NavContainer>
  );
};

import * as React from 'react';

const ChapterContext = React.createContext<ChapterContext | undefined>(undefined);

const ChapterContextProvider = ({ children }: { children?: React.ReactNode; chapter: string }) => {
  const aboutRef = React.useRef(null);
  const alnylamRef = React.useRef(null);
  const rggRef = React.useRef(null);
  const grubhubRef = React.useRef(null);
  const levelUpRef = React.useRef(null);
  const amalgamRef = React.useRef(null);
  const launchRef = React.useRef(null);
  const photographyRef = React.useRef(null);
  const contactRef = React.useRef(null);

  const defaultChapters: ChaptersState = {
    refs: {
      about: {
        title: 'about',
        ref: aboutRef
      },
      alnylam: {
        title: 'bifxcodex',
        ref: alnylamRef
      },
      rgg: {
        title: 'team bemo',
        ref: rggRef
      },
      grubhub: {
        title: 'glubbleup',
        ref: grubhubRef
      },
      levelUp: {
        title: 'platypod',
        ref: levelUpRef
      },
      amalgam: {
        title: 'dog days',
        ref: amalgamRef
      },
      launch: {
        title: 'origins',
        ref: launchRef
      },
      photography: {
        title: 'photography',
        ref: photographyRef
      },
      contact: {
        title: 'contact',
        ref: contactRef
      }
    },
    current: null
  };

  const [chapters, setChapters] = React.useState(defaultChapters);
  return (
    <ChapterContext.Provider value={ { chapters, setChapters } }>
      { children }
    </ChapterContext.Provider>
  );
};

const ChapterContextProviderNotDefined = Error('ExpandedPanelGroupContext must be used with ExpandedPanelGroupProvider.');

export const useChapters = () => {
  const context = React.useContext(ChapterContext);

  if (context === undefined) {
    throw ChapterContextProviderNotDefined;
  }

  return context;
};

export const ChaptersContextProvider = ({ children, chapter }: { children?: React.ReactNode; chapter: string }) => {
  return (
    <ChapterContextProvider chapter={ chapter }>
      { children }
    </ChapterContextProvider>
  );
};

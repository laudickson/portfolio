import '@emotion/react';

declare module '@emotion/react' {
  interface Colors {
    black: string;
    pages: Record<ChapterIds, string>
  }
  export interface Theme {
    fonts: {
      primary: string;
      secondary: string;
    },
    colors: Colors,
    spacing: Record<string, Record<string,string>>,
  }
}

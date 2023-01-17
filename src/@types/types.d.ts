type ChapterIds = 'about' | 'alnylam' | 'rgg' | 'grubhub' | 'levelUp' | 'amalgam' | 'launch' | 'photography' | 'contact'

type ChapterRef = React.RefObject<HTMLDivElement>;

interface ChapterContext {
  chapters: ChaptersState;
  setChapters: React.Dispatch<React.SetStateAction<ChaptersState>>;
}

interface ChapterType {
  title: string;
  ref: ChapterRef
}

interface ChaptersState {
  refs: Record<ChapterIds, ChapterType>;
  current: string | null;
}

interface PageProps {
  children?: React.ReactNode;
  pageId: ChapterIds;
}

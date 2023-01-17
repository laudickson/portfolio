import * as React from 'react';

export default function useOnScreen(ref: React.RefObject<HTMLElement>) {

  const [isIntersecting, setIntersecting] = React.useState(false);

  const observer = React.useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting), { threshold: 0.8 }
  ), [ref]);


  React.useEffect(() => {
    if (ref?.current) {
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, []);

  return isIntersecting;
}

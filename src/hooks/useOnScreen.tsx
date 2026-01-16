import * as React from 'react';

export default function useOnScreen(ref: React.RefObject<HTMLElement>) {
    const [isIntersecting, setIntersecting] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
            threshold: 0.8,
        });

        const element = ref.current;

        if (element) {
            observer.observe(element);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
}

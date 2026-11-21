'use client';

import { useEffect, useRef, useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Classes for the frame that wraps the photo (size, rounding, shadow, margin). */
  frameClass?: string;
};

// A photo that "builds" itself when scrolled into view, like the splash cabin:
// blueprint frame and corner brackets draw → the photo stacks up from the
// bottom in panels with a scan line → colour comes in and the blueprint fades.
export default function BuildImg({ frameClass = 'h-full w-full', className = '', alt = '', ...img }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setBuilt(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBuilt(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={`bp-photo ${built ? 'is-built' : ''} ${frameClass}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={alt} {...img} className={className} />
      <span className="bp-scan" aria-hidden="true" />
      <span className="bp-corners" aria-hidden="true" />
    </span>
  );
}

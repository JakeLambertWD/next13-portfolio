import { useEffect, useRef, useState } from "react";

type UseHorizontalScrollThumbOptions = {
  minThumbWidthPercent?: number;
  deps?: ReadonlyArray<unknown>;
};

export function useHorizontalScrollThumb(
  options: UseHorizontalScrollThumbOptions = {},
) {
  const { minThumbWidthPercent = 12, deps = [] } = options;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [thumbWidth, setThumbWidth] = useState(20);
  const [thumbX, setThumbX] = useState(0);

  useEffect(() => {
    const updateThumb = () => {
      const el = scrollerRef.current;
      if (!el) return;

      const viewport = el.clientWidth;
      const content = el.scrollWidth;
      const maxScrollLeft = content - viewport;

      if (maxScrollLeft <= 0) {
        setThumbWidth(100);
        setThumbX(0);
        return;
      }

      const nextWidth = Math.max(
        (viewport / content) * 100,
        minThumbWidthPercent,
      );
      const maxTrackTravel = 100 - nextWidth;
      const nextX = (el.scrollLeft / maxScrollLeft) * maxTrackTravel;

      setThumbWidth(nextWidth);
      setThumbX(nextX);
    };

    const el = scrollerRef.current;
    if (!el) return;

    updateThumb();
    el.addEventListener("scroll", updateThumb, { passive: true });
    window.addEventListener("resize", updateThumb);

    return () => {
      el.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, [minThumbWidthPercent, ...deps]);

  return { scrollerRef, thumbWidth, thumbX };
}

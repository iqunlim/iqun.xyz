import { useEffect, useState } from "react";

export default function useFadeIn<T extends HTMLElement | null>(
  ref: React.RefObject<T>[],
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Observer logic
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    // For each ref, observe, return unobserve cleanup
    const refEntries = ref;
    refEntries.forEach((refEntry) => {
      if (!refEntry.current) return;
      observer.observe(refEntry.current);
    });

    return () => {
      refEntries.forEach((refEntry) => {
        if (!refEntry.current) return;
        observer.unobserve(refEntry.current);
      });
    };
  }, [ref]);

  return visible;
}

// Sort of ugly, maybe this can be translated in to css utility classes?
export const useFadeInWithStyle = <T extends HTMLElement | null>(
  ref: React.RefObject<T>[],
): React.CSSProperties => {
  const visible = useFadeIn(ref);

  const ret: React.CSSProperties = {
    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
  };

  if (visible) {
    ret.opacity = "1";
    ret.transform = "translateY(0)";
  } else {
    ret.opacity = "0";
    ret.transform = "translateY(30px)";
  }

  return ret;
};

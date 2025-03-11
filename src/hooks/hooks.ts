import { useEffect, useState } from "react";

export default function useVisibleObserver<T extends HTMLElement | null>(
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
export const useFadeIn = <T extends HTMLElement | null>(
  ref: React.RefObject<T>[],
  direction?: "up" | "down" | "left" | "right",
): React.CSSProperties => {
  const visible = useVisibleObserver(ref);

  const [restingPos, initialPos] = directionToTranslate(direction);

  const ret: React.CSSProperties = {
    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
    transitionDelay: "0.5s",
  };

  if (visible) {
    ret.opacity = "1";
    ret.transform = restingPos;
  } else {
    ret.opacity = "0";
    ret.transform = initialPos;
  }

  return ret;
};

function directionToTranslate(
  direction: "up" | "down" | "left" | "right" | undefined,
): [string, string] {
  switch (direction) {
    case "up":
      return ["translateY(0)", "translateY(30px)"];

    case "down":
      return ["translateY(0)", "translateY(-30px)"];

    case "left":
      return ["translateX(0)", "translateX(30px)"];

    case "right":
      return ["translateX(0)", "translateX(-30px)"];

    default:
      return ["translateY(0)", "translateY(30px)"];
  }
}

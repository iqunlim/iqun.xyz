import React, { memo } from "react";
import { isEqual } from "lodash";

/**
 * Circle Visualizer component
 * @param size: The total width and height in pixels of the component
 * @param innerCircleSize: The width and height in percentage of area
 * @param gap: The gap in pixels between the rotating bars. If the rotating bars are ever <1 their width will be 1
 * @param colors: An array of CSS Colors to apply randomly to each bar and the inner circle
 */
const CircleVis = memo(function ({
  size,
  innerCircleSize = 10,
  gap = 0,
  colors = ["#FFFFFF"],
}: {
  size: number;
  innerCircleSize?: number;
  gap?: number;
  colors?: string[];
}) {
  const borderWidth = size / 20 - gap; // Width of each individual border, size / 20 is good for 10% iterations
  const newStyles: React.CSSProperties[] = []; // This is the border styles that will be randomly applied

  let totalPercent = innerCircleSize; // Start with the inner circle percentage and go from there
  let reverse = false; // Used to make the borders rotate in an alternating style

  const getRandomBorderStyle = (): React.CSSProperties => {
    const sides = [
      "borderTopColor",
      "borderBottomColor",
      "borderLeftColor",
      "borderRightColor",
    ];
    const shouldApplyBorder = Math.random() < 0.9; // 10% chance for no border, for some flair

    if (!shouldApplyBorder) return {};

    // Set a random side to a random color
    const randomSide = sides[Math.floor(Math.random() * sides.length)];
    return {
      [randomSide]: colors[Math.floor(Math.random() * colors.length)],
    } as React.CSSProperties;
  };

  while (totalPercent + 10 <= 100) {
    // Iterate by 10% until you hit 100% width and height
    totalPercent += 10;

    const initialStyle: React.CSSProperties = {
      borderWidth: `${borderWidth < 1 ? 1 : borderWidth}px`,
      width: `${totalPercent}%`,
      height: `${totalPercent}%`,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    };

    newStyles.push({ ...initialStyle, ...getRandomBorderStyle() });
  }

  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className="relative"
    >
      <div
        style={{
          width: `${innerCircleSize}%`,
          height: `${innerCircleSize}%`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
        className="absolute top-1/2 left-1/2 translate-[-50%] rounded-full"
      ></div>
      {newStyles &&
        newStyles.map((state, index) => {
          reverse = !reverse;
          return (
            <div
              key={index}
              style={state}
              // If I do not do the animation in tailwind, the base tailwind style will break the animation. It must be done here
              className={`absolute top-1/2 left-1/2 inline-block translate-[-50%] ${reverse ? `animate-[spin_10s_linear_infinite]` : `animate-[spin_10s_linear_infinite_reverse]`} rounded-full`}
            ></div>
          );
        })}
    </div>
  );
}, isEqual);

export default CircleVis;

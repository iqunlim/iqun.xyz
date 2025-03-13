import React, { memo } from "react";
import { isEqual } from "lodash";

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
  const borderWidth = size / 20 - gap;
  let totalPercent = innerCircleSize;
  let reverse = false;
  const newStyles: React.CSSProperties[] = [];
  while (totalPercent + 10 <= 100) {
    totalPercent += 10;

    const initialStyle: React.CSSProperties = {
      borderWidth: `${borderWidth}px`,
      width: `${totalPercent}%`,
      height: `${totalPercent}%`,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    };

    const getRandomBorderStyle = (): React.CSSProperties => {
      const sides = [
        "borderTopColor",
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
      ];
      const shouldApplyBorder = Math.random() < 0.9;

      if (!shouldApplyBorder) return {};

      const randomSide = sides[Math.floor(Math.random() * sides.length)];
      return {
        [randomSide]: colors[Math.floor(Math.random() * colors.length)],
      } as React.CSSProperties;
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
              className={`absolute top-1/2 left-1/2 inline-block translate-[-50%] ${reverse ? `animate-[spin_10s_linear_infinite]` : `animate-[spin_10s_linear_infinite_reverse]`} rounded-full`}
            ></div>
          );
        })}
    </div>
  );
}, isEqual);

export default CircleVis;

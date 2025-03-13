import React, { memo, useEffect, useState } from "react";
import { isEqual } from "lodash";

const CircleVis = memo(function Circlevis({
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
  const [circleDivState, setCircleDivState] = useState<React.CSSProperties[]>();

  useEffect(() => {
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
        animation: `spin 10s linear infinite ${reverse ? "reverse" : "normal"}`,
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

      reverse = !reverse;
    }
    setCircleDivState(newStyles);
    console.log(newStyles);
  }, [colors, gap, innerCircleSize, size]);

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
      {circleDivState &&
        circleDivState.map((state, index) => (
          <div
            key={index}
            style={state}
            className="absolute top-1/2 left-1/2 inline-block translate-[-50%] rounded-full"
          ></div>
        ))}
    </div>
  );
}, isEqual);

export default CircleVis;

// Initial circle size (in %s)
// Growth factor, how much space between or whatever (in %s) this will dictate how many bars are allowed
// How wide should they be? which borders are transparent, should this be random somehow? (Perhaps calculate-able based on the growth factor or %s) (full width/20 = borders touch)
// Direction of spin (alternating?)
// Fill all bars until div filled? ex div size calculated and then you like fractionally create bars until its filled based on the growth factor? idk
// Spin speed

// Using percentages will help the growth factor maybe
// Initial size in %, growth factor in %
// Whatever the div size is in rem or whatever....passed in to the root element

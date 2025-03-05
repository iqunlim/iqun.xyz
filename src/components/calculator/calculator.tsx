import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";

export type CalculatorState = {
  num1: number;
  num2?: number;
  operand?: string;
  decimal?: number;
  result?: string;
};

const buttonStates = [
  7,
  8,
  9,
  "+",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "x",
  0,
  ".",
  "=",
  "/",
];

export default function Calculator() {
  const [calcState, setCalcState] = useState<CalculatorState>({
    num1: 0,
  });

  const onNumberClick = (value: number) => {
    if (calcState.decimal && value === 0) {
      setCalcState((prev) => ({
        ...prev,
        decimal: prev.decimal ? prev.decimal / 10 : 0.1,
      }));
      return;
    }
    if (!calcState.operand) {
      setCalcState((prev) => ({
        ...prev,
        num1: calcState.decimal
          ? prev.num1 + value * calcState.decimal
          : prev.num1 * 10 + value,
        decimal: prev.decimal ? prev.decimal / 10 : undefined,
      }));
      return;
    }
    setCalcState((prev) => ({
      ...prev,
      num2: calcState.decimal
        ? (prev.num2 || 0) + value * calcState.decimal
        : (prev.num2 || 0) * 10 + value,
      decimal: prev.decimal ? prev.decimal / 10 : undefined,
    }));
  };

  const onSignClick = (value: string) => {
    if (calcState.result) {
      setCalcState((prev) => ({
        num1: parseFloat(prev.result || "0"),
        operand: value,
      }));
    }
    setCalcState((prev) => ({ ...prev, operand: value, decimal: undefined }));
  };

  const onEqualsClick = () => {
    console.log("Equals clicked");
    let result: number | string;
    const num2 = calcState.num2 || 0;
    switch (calcState.operand) {
      case "+":
        result = calcState.num1 + num2;
        break;
      case "-":
        result = calcState.num1 - num2;
        break;
      case "x":
        result = calcState.num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          result = "!Div/0";
          break;
        }
        result = calcState.num1 / num2;
        break;
      default:
        result = calcState.num1;
    }
    setCalcState((prev) => ({
      ...prev,
      result: typeof result === "number" ? result.toString() : result,
    }));
  };

  const onDecimal = () => {
    if (!calcState.decimal) setCalcState((prev) => ({ ...prev, decimal: 0.1 }));
  };

  const calcValues = `${calcState.num1}${calcState.operand ? calcState.operand : ""}${
    calcState.num2 !== undefined ? calcState.num2 : ""
  }`;

  return (
    <div className="bg-accent h-fit max-w-2xl min-w-md flex-1 rounded-md p-4">
      <p className="ml-1 text-lg">Simple Calculator</p>
      <div>
        <p
          aria-label={calcValues}
          className="min-w-l bg-background text-foreground border-border max-w-2xl rounded-md border-2 p-1 text-right"
        >
          {calcValues}
        </p>
      </div>
      <div>
        <p className="ml-1">Result:</p>
        <p
          aria-label={calcState.result ? calcState.result : "No Value"}
          className="min-w-l bg-background text-foreground border-border min-h-9 max-w-2xl rounded-md border-2 p-1 text-right"
        >
          {calcState.result ? calcState.result : ""}
        </p>
      </div>
      <div className="mt-1 grid grid-cols-4 grid-rows-5 gap-1">
        {buttonStates.map((state) => (
          <Button
            key={state}
            className={clsx({
              "bg-amber-500 text-black hover:bg-amber-700":
                typeof state === "string",
            })}
            onClick={() =>
              typeof state === "number"
                ? onNumberClick(state)
                : state === "="
                  ? onEqualsClick()
                  : state === "."
                    ? onDecimal()
                    : onSignClick(state)
            }
          >
            {state}
          </Button>
        ))}
        <Button
          className="bg-green-500 hover:bg-green-700"
          onClick={() => setCalcState({ num1: 0 })}
        >
          C
        </Button>
      </div>
    </div>
  );
}

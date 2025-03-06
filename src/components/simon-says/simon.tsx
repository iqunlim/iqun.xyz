import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type SimonSaysAction = {
  type: string; // Some sort of enum?
  handler: <T extends Event | React.SyntheticEvent>(event: T) => void; // should handle all react events and otherwise
};

type SimonProps = {
  timeSeconds?: number;
};

// Initial load state?
// Button to remove initial load state by starting the game and starting the main loop
// Counter to count successful guesses

export default function SimonSays() {
  const [setup, setSetup] = useState(true);

  useEffect(() => {
    if (setup) return;
    const timerLoopRef = setInterval(() => console.log("beep"), 1000);

    return () => {
      clearInterval(timerLoopRef);
    };
  }, [setup]);

  if (setup) {
    return <Button onClick={() => setSetup(false)}>Start!</Button>; // The setup page
  }
  return (
    <div className="bg-accent flex h-[calc(100vh-200px)] w-1/2 items-center justify-center rounded-md">
      <h1>Simon says click the mouse!</h1>
    </div>
  );
}

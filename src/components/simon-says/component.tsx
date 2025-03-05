type SimonSaysAction = {
  type: string; // Some sort of enum?
  handler: <T extends Event | React.SyntheticEvent>(event: T) => void; // should handle all react events and otherwise
};

export default function SimonSays() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

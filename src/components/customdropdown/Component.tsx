import Dropdown from "./Dropdown/Dropdown";
import DropdownItem from "./DropdownItem/DropdownItem";

export default function CustomDropDownExampleComponent() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="bg-accent relative flex h-[calc(100vh-150px)] w-full items-center justify-center">
      <div className="absolute top-1/2 flex gap-5">
        <Dropdown
          buttonText="Dropdown Button"
          content={
            <>
              {items.map((item) => (
                <DropdownItem
                  key={item}
                  onClick={() => console.log(`Clicked ${item}`)}
                >
                  <span>{`Item ${item}`}</span>
                </DropdownItem>
              ))}
            </>
          }
        />
      </div>
    </div>
  );
}

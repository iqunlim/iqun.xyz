import { useTheme } from "./components/theme/theme-provider";
import imgDark from "./img/av.png";

export default function Av() {
  const { theme } = useTheme();
  return (
    <>
      {theme === "light" ? (
        <img className="h-[50px] w-[50px]" src={imgDark} />
      ) : (
        <img src={imgDark} />
      )}
    </>
  );
}

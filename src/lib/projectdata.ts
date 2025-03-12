import vanlife from "../img/projects/vanlife.png";

export type ComponentInformation = {
  title: string;
  img?: string;
  href: string;
  description: string;
};

export const BasicComponents: ComponentInformation[] = [
  {
    title: "Calculator",
    href: "/calc",
    description: "A Basic calculator",
  },
  {
    title: "Dropdown Menu",
    href: "/dropdown",
    description: "Animated Dropdown menu",
  },
];

export const GameComponents: ComponentInformation[] = [
  {
    title: "Connect Four",
    href: "/connect4",
    description: "Connect Four board game",
  },
  {
    title: "Simon Says",
    href: "/simon",
    description: "Simon says Click The mouse!",
  },
];

export const Pages: ComponentInformation[] = [
  {
    title: "#VanLife",
    img: vanlife,
    href: "/vanlife",
    description: "#Vanlife App",
  },
  {
    title: "poring.xyz",
    href: "/poring",
    description: "React 19-based File uploader",
  },
];

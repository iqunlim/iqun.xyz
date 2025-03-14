import vanlife from "../img/projects/vanlife.png";
import poring from "../img/projects/poring.png";

export type ComponentInformation = {
  title: string;
  img?: string;
  href: string;
  src?: string;
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
    src: "https://github.com/iqunlim/vanlife",
    description: "Figma Design to Real Webpage",
  },
  {
    title: "poring.xyz",
    img: poring,
    href: "/poring",
    src: "https://github.com/iqunlim/poring.xyz",
    description: "React 19 and S3-based File uploader",
  },
];

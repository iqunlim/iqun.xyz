type ComponentInformation = {
  title: string;
  img?: string;
  href: string;
  description: string;
};

const basicComponents: ComponentInformation[] = [
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

const gameComponents: ComponentInformation[] = [
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

const pages: ComponentInformation[] = [
  {
    title: "#VanLife",
    href: "/vanlife",
    description: "#Vanlife App",
  },
  {
    title: "poring.xyz",
    href: "/poring",
    description: "React 19-based File uploader",
  },
];

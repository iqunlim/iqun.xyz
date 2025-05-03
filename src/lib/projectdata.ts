import vanlife from "@/assets/projects/vanlife.png";
import poring from "@/assets/projects/poring.png";
import blog from "@/assets/projects/blog.png";

export type ComponentInformation = {
  internalName: string;
  title: string;
  img?: string;
  href: string;
  gh?: string;
  src?: string;
  description: string;
};

export const BasicComponents: ComponentInformation[] = [
  {
    internalName: "calc",
    title: "Calculator",
    href: "/components/calc",
    description: "A Basic calculator",
  },
  {
    internalName: "dropdown",
    title: "Dropdown Menu",
    href: "/components/dropdown",
    description: "Animated Dropdown menu",
  },
];

export const GameComponents: ComponentInformation[] = [
  {
    internalName: "cfour",
    title: "Connect Four",
    href: "/components/cfour",
    description: "Connect Four board game",
  },
];

export const Pages: ComponentInformation[] = [
  {
    internalName: "vanlife",
    title: "#VanLife",
    img: vanlife.src,
    href: "https://startling-biscuit-830178.netlify.app/",
    gh: "https://github.com/iqunlim/vanlife",
    src: "https://startling-biscuit-830178.netlify.app/",
    description: "Figma Design to Real Webpage",
  },
  {
    internalName: "poring",
    title: "poring.xyz",
    img: poring.src,
    href: "https://poring.xyz",
    gh: "https://github.com/iqunlim/poring.xyz",
    src: "https://poring.xyz",
    description: "React 19 and S3-based File uploader",
  },
  {
    internalName: "blog",
    title: "This Site!",
    img: blog.src,
    href: "https://iqun.xyz",
    gh: "https://github.com/iqunlim/iqun.xyz",
    src: "https://iqun.xyz",
    description: "This site is also a blog site!",
  },
];

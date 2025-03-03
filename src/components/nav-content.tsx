import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

type ComponentInformation = {
  title: string;
  href: string;
  description: string;
};

const basicComponents: ComponentInformation[] = [
  {
    title: "Calculator",
    href: "/calc",
    description: "A Basic calculator with decimals",
  },
  {
    title: "Dropdown Menu",
    href: "/dropdown",
    description: "Basic animated Dropdown menu",
  },
];

const gameComponents: ComponentInformation[] = [
  {
    title: "Connect Four",
    href: "/connect4",
    description: "A Basic Connect 4 Game",
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

export function NavMenu() {
  return (
    <NavigationMenu className="mx-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <SectionTitleBar title="Basic Components" />
            <ul className="z-100 grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {basicComponents.map((component) => (
                <NavLinkContent key={component.title} component={component} />
              ))}
            </ul>
            <SectionTitleBar title="Games" />
            <ul className="z-100 grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {gameComponents.map((component) => (
                <NavLinkContent key={component.title} component={component} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <SectionTitleBar title="Full Webpages" />
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {pages.map((component) => (
                <NavLinkContent key={component.title} component={component} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink className={navigationMenuTriggerStyle()} to="/about">
            About Me
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden sm:block">
          <a
            className={`${navigationMenuTriggerStyle()}`}
            href="https://github.com/iqunlim/random-components"
            target="#"
          >
            Source Code (Github)
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavLinkContent({ component }: { component: ComponentInformation }) {
  return (
    <NavLink
      className="border-l-primary hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground shadow-secondary block space-y-1 rounded-md border-l-4 p-3 leading-none no-underline shadow-sm transition-colors outline-none select-none"
      title={component.title}
      to={component.href}
    >
      <p className="text-sm leading-none font-medium">{component.title}</p>
      <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
        {component.description}
      </p>
    </NavLink>
  );
}

function SectionTitleBar({ title }: { title: string }) {
  return (
    <div>
      <h3 className="w-[75%] pt-4 pl-4 text-base">{title}</h3>
      <div className="border-primary ml-4 w-1/2 rounded-full border"></div>
    </div>
  );
}

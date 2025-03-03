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

const components: ComponentInformation[] = [
  {
    title: "Calculator",
    href: "/calc",
    description: "A Basic calculator with decimals",
  },
  {
    title: "Connect Four",
    href: "/connect4",
    description: "A Basic Connect 4 Game",
  },
  {
    title: "Dropdown Menu",
    href: "/dropdown",
    description: "Basic animated Dropdown menu",
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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="z-100 grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <NavLinkContent key={component.title} component={component} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
          <NavigationMenuContent>
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
      className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
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

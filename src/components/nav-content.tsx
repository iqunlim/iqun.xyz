import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Calculator",
    href: "/calc",
    description: "A Basic calculator with decimals",
  },
  {
    title: "Test",
    href: "/test",
    description: "A Test component",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <NavLink
                  className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                  key={component.title}
                  title={component.title}
                  to={component.href}
                >
                  <p className="text-sm leading-none font-medium">
                    {component.title}
                  </p>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    {component.description}
                  </p>
                </NavLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a
            className={navigationMenuTriggerStyle()}
            href="https://github.com/iqunlim"
            target="#"
          >
            Source Code
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

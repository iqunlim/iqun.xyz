"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import {
  BasicComponents,
  GameComponents,
  Pages,
  ComponentInformation,
} from "@/lib/projectdata";

export function NavMenu() {
  return (
    <NavigationMenu className="mx-4">
      <NavigationMenuList className="grid grid-cols-2 grid-rows-2 gap-2 sm:flex">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <SectionTitleBar title="Basic Components" />
            <ul className="z-100 grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {BasicComponents.map((component) => (
                <NavLinkContent key={component.title} component={component} />
              ))}
            </ul>
            <SectionTitleBar title="Games" />
            <ul className="z-100 grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {GameComponents.map((component) => (
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
              {Pages.map((component) => (
                <NavLinkContent key={component.title} component={component} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link className={navigationMenuTriggerStyle()} href="/about">
            About Me
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
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
    <Link
      className="border-l-primary hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground shadow-secondary block space-y-1 rounded-md border-l-4 p-3 leading-none no-underline shadow-sm transition-colors outline-none select-none"
      title={component.title}
      href={component.href}
    >
      <p className="text-sm leading-none font-medium">{component.title}</p>
      <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
        {component.description}
      </p>
    </Link>
  );
}

function SectionTitleBar({ title }: { title: string }) {
  return (
    <div>
      <h3 className="w-3/4 pt-4 pl-4 text-base">{title}</h3>
      <div className="border-primary ml-4 w-1/2 rounded-full border"></div>
    </div>
  );
}

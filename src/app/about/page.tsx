"use client";
import StackBadge from "@/components/aboutpage/StackBadge";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { BsArrowDown } from "react-icons/bs";
import { SlUser } from "react-icons/sl";

import linux from "../img/logos/linux.svg";
import ts from "../img/logos/typescript.svg";
import py from "../img/logos/python.svg";
import docker from "../img/logos/docker.svg";
import react from "../img/logos/react.svg";
import tailwind from "../img/logos/tailwind.svg";
import node from "../img/logos/nodejs-icon.svg";
import git from "../img/logos/Git_icon.svg";
import sql from "../img/logos/sql-database-generic-svgrepo-com.svg";
import html from "../img/logos/html5.svg";
import github from "../img/logos/github-mark.svg";
import linkedin from "../img/logos/LI-Logo.png";
import av from "../img/av2.png";

import { useFadeIn } from "@/hooks/hooks";
import ContactForm from "@/components/aboutpage/ContactForm";
import SectionTitle from "@/components/ui/section-title";
import ProjectCard, {
  CardInformation,
} from "@/components/aboutpage/ProjectCard";
import { Pages } from "@/lib/projectdata";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { DelayGenerator } from "@/lib/utils";
import dynamic from "next/dynamic";

// Because there is an element of randomness, this cant be SSR'd, so we must do this
// TODO: Investigate if there is a better way to do this
const Circlevis = dynamic(
  () => import("../../components/aboutpage/Circlevis"),
  { ssr: false },
);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const moreInfoRef = useRef<HTMLDivElement>(null);

  const introStyle = useFadeIn([introRef], "up");
  const aboutStyle = useFadeIn([sectionRef], "right");
  const projectStyle = useFadeIn([projectRef, moreInfoRef], "down");

  // const delayGenerator = DelayGenerator();
  const infoGenerator = DelayGenerator();

  return (
    <main className="px-2">
      <div className="pointer-events-auto absolute top-5 right-5 z-10 h-fit w-fit">
        <ModeToggle />
      </div>
      <section
        style={introStyle}
        ref={introRef}
        className="flex h-[calc(100vh+6rem)] flex-col items-center justify-center gap-4 border-b-4"
      >
        <div className="bg-background-transparent flex flex-col gap-2 border p-4">
          <p className="text-center text-5xl md:text-6xl">
            Hi! I&apos;m{" "}
            <span className="font-semibold text-purple-500">Daniel</span>.
          </p>
          <p className="text text-center text-4xl md:text-5xl">
            I&apos;m an I.T. professional turned web developer.
          </p>
        </div>
        <Button
          className="text-xl"
          onClick={() =>
            sectionRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Learn about me <BsArrowDown />
        </Button>
      </section>
      <section
        ref={sectionRef}
        style={aboutStyle}
        className="flex max-h-fit min-h-svh flex-col justify-center border-b-4 pb-8"
      >
        <SectionTitle>About</SectionTitle>
        <div className="flex w-full flex-col items-center justify-around lg:flex-row">
          <div className="flex w-full flex-col items-center gap-8 p-4 lg:w-1/3">
            <SlUser className="h-[10rem] w-[10rem] md:h-[20rem] md:w-[20rem]" />
            <p className="text-md bg-background-transparent border p-2 font-bold">
              With a strong foundation in I.T. and a passion for
              problem-solving, I&apos;ve transitioned through self-learning into
              the world of web development, specializing in React, JavaScript,
              and modern frontend technologies. My background in I.T. has
              equipped me with a deep understanding of system architecture,
              troubleshooting, and efficiency—skills I now apply to building
              sleek, high-performing web applications. When not working on my
              newest project, I enjoy old school videogames and making music.
            </p>
          </div>
          <div>
            <div className="flex gap-4">
              <div className="flex flex-col justify-center gap-4">
                <StackBadge text="Docker" image={docker.src} />
                <StackBadge text="Typescript" image={ts.src} />
                <StackBadge text="React" image={react.src} />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <StackBadge text="HTML" image={html.src} />
                <StackBadge text="SQL" image={sql.src} />
                <StackBadge text="Git" image={git.src} />
                <StackBadge text="Node.js" image={node.src} />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <StackBadge text="TailwindCSS" image={tailwind.src} />
                <StackBadge text="Linux" image={linux.src} />
                <StackBadge text="Python" image={py.src} />
              </div>
            </div>
          </div>
        </div>

        <Button
          className="m-auto my-4 w-fit text-xl"
          onClick={() =>
            projectRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          My Projects <BsArrowDown />
        </Button>
      </section>
      <section
        ref={projectRef}
        style={projectStyle}
        className="pb-auto flex max-h-fit min-h-svh flex-col border-b-4"
      >
        <SectionTitle>Projects</SectionTitle>
        <div className="grid max-h-[calc(100svh*2/3)] grid-cols-1 gap-4 overflow-x-visible overflow-y-auto rounded-lg p-2 md:max-h-fit md:grid-cols-2 md:overflow-y-visible lg:grid-cols-3">
          {Pages.map((entry) => (
            <ProjectCard
              key={entry.title}
              info={entry as CardInformation} // TODO: do this better
              // delay={delayGenerator.next().value || 0}
            />
          ))}
        </div>
        <Button
          className="mt-auto mb-8 w-fit self-center text-xl"
          onClick={() =>
            moreInfoRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          More Information <BsArrowDown />
        </Button>
      </section>
      <section ref={moreInfoRef} className="border-b-4 pb-8">
        <SectionTitle>More Information</SectionTitle>
        <div className="grid max-h-svh grid-cols-1 gap-4 overflow-visible rounded-lg p-2 md:max-h-fit md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            info={{
              title: "Github",
              img: github.src,
              href: "https://github.com/iqunlim",
              description: "Check out my github!",
            }}
            delay={infoGenerator.next().value || 0}
          />
          <ProjectCard
            info={{
              title: "Linkedin",
              img: linkedin.src,
              href: "https://www.linkedin.com/in/daniel-carpenter-2371309b/",
              description: "Check out my Linkedin!",
            }}
            delay={infoGenerator.next().value || 0}
          />
          <ProjectCard
            info={{
              title: "Resume",
              img: av.src,
              href: "#",
              description: "TODO: Check out my resume!",
            }}
            delay={infoGenerator.next().value || 0}
          />
        </div>
      </section>
      <section className="flex flex-col items-center gap-4 pb-8">
        <SectionTitle>Contact</SectionTitle>
        <p className="bg-background-transparent border p-2 text-center">
          Want to collaborate? Interested in hiring me? Have any questions? Feel
          free to drop me an email!
        </p>
        <ContactForm />
        <Button
          className="m-auto"
          onClick={() =>
            introRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          ^^^^
        </Button>
      </section>
      <div className="transform-[translate(-50%, -50%)] fixed top-1/2 left-1/2 -z-10">
        <Circlevis
          size={600}
          innerCircleSize={10}
          gap={10}
          colors={[
            "oklch(0.623 0.214 259.815)",
            "oklch(0.627 0.265 303.9)",
            "oklch(0.723 0.219 149.579)",
          ]}
        />
      </div>
      <div className="transform-[translate(-50%, -50%)] fixed top-10 left-0 -z-10">
        <Circlevis
          size={200}
          innerCircleSize={5}
          gap={5}
          colors={[
            "oklch(0.623 0.214 259.815)",
            "oklch(0.627 0.265 303.9)",
            "oklch(0.723 0.219 149.579)",
          ]}
        />
      </div>
    </main>
  );
}

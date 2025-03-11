import StackBadge from "@/components/aboutpage/StackBadge";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { BsArrowDown } from "react-icons/bs";
import { SlUser } from "react-icons/sl";

import linux from "../../img/logos/linux.svg";
import ts from "../../img/logos/typescript.svg";
import py from "../../img/logos/python.svg";
import docker from "../../img/logos/docker.svg";
import react from "../../img/logos/react.svg";
import tailwind from "../../img/logos/tailwind.svg";
import node from "../../img/logos/nodejs-icon.svg";
import git from "../../img/logos/Git_icon.svg";
import sql from "../../img/logos/sql-database-generic-svgrepo-com.svg";
import html from "../../img/logos/html5.svg";

import { useFadeIn } from "@/hooks/hooks";
import ContactForm from "@/components/aboutpage/ContactForm";
import SectionTitle from "@/components/ui/section-title";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const introStyle = useFadeIn([introRef], "up");
  const aboutStyle = useFadeIn([sectionRef], "right");

  return (
    <main className="main">
      <section
        style={introStyle}
        ref={introRef}
        className="flex h-[calc(100vh+6rem)] flex-col items-center justify-center gap-4 border-b-4 border-b-blue-500"
      >
        <div className="flex flex-col gap-2">
          <p className="text-center text-5xl md:text-6xl">
            Hi! I'm{" "}
            <span className="font-semibold text-purple-500">Daniel</span>.
          </p>
          <p className="text-center text-4xl md:text-5xl">
            I'm an I.T. professional turned web developer.
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
        className="my-8 flex flex-col justify-center border-b-4 border-b-blue-500 py-8"
      >
        <SectionTitle>About</SectionTitle>
        <div className="flex w-full flex-col items-center justify-around lg:flex-row">
          <div className="flex w-full flex-col items-center gap-8 p-4 lg:w-1/3">
            <SlUser className="h-[20rem] w-[20rem]" />
            <p>
              With a strong foundation in I.T. and a passion for
              problem-solving, I've transitioned through self-learning into the
              world of web development, specializing in React, JavaScript, and
              modern frontend technologies. My background in I.T. has equipped
              me with a deep understanding of system architecture,
              troubleshooting, and efficiency—skills I now apply to building
              sleek, high-performing web applications. When not working on my
              newest project, I enjoy old school videogames and making music.
            </p>
          </div>
          <div>
            <div className="flex gap-4">
              <div className="flex flex-col justify-center gap-4">
                <StackBadge text="Docker" image={docker} />
                <StackBadge text="Typescript" image={ts} />
                <StackBadge text="React" image={react} />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <StackBadge text="HTML" image={html} />
                <StackBadge text="SQL" image={sql} />
                <StackBadge text="Git" image={git} />
                <StackBadge text="Node.js" image={node} />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <StackBadge text="TailwindCSS" image={tailwind} />
                <StackBadge text="Linux" image={linux} />
                <StackBadge text="Python" image={py} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center gap-4 pb-8">
        <SectionTitle>Contact</SectionTitle>
        <p className="text-center">
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
    </main>
  );
}

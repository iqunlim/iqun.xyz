import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
// import vanlife from "../../img/projects/vanlife.png";
import avi from "../../app/img/av2.png";
import { useRef } from "react";
import { useFadeIn } from "@/hooks/hooks";
import Image from "next/image";

export type CardInformation = {
  title: string;
  img: string;
  href: string;
  description: string;
};

function ProjectCard({
  info,
  delay = 0,
}: {
  info: CardInformation;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardStyle = useFadeIn([cardRef], "right", delay + 0.5);

  if (!info) return;
  return (
    <a href={info.href} target="#">
      <div
        ref={cardRef}
        style={cardStyle}
        className="flex h-full w-full items-center justify-center rounded-md transition-transform hover:scale-110"
      >
        <Card className="bg-background-transparent border-gradient h-full w-full cursor-pointer border-4">
          <CardHeader>
            <CardTitle>{info.title}</CardTitle>
            <CardDescription>{info.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {info.img ? (
              <Image
                className="m-auto max-h-48 rounded-md"
                src={info.img}
                alt={"Project preview image"}
              /> // TODO: Do this alt better
            ) : (
              <Image
                className="m-auto max-h-48 rounded-md"
                src={avi.src}
                alt={"Generic project Image"}
              />
            )}
          </CardContent>
          {/* <CardFooter className="mt-auto">
          {info.src ? (
            <a href={info.src} target="#">
              View Source Code
            </a>
          ) : (
            <p>No source code available</p>
          )}
        </CardFooter> */}
        </Card>
      </div>
    </a>
  );
}

export default ProjectCard;

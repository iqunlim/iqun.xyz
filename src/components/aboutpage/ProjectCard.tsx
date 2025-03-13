import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
// import vanlife from "../../img/projects/vanlife.png";
import avi from "../../img/av2.png";
import { ComponentInformation } from "@/lib/projectdata";
import { useRef } from "react";
import { useFadeIn } from "@/hooks/hooks";

function ProjectCard({
  info,
  delay = 0,
}: {
  info: ComponentInformation;
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
              <img className="m-auto max-h-48 rounded-md" src={info.img} />
            ) : (
              <img className="m-auto max-h-48 rounded-md" src={avi} />
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

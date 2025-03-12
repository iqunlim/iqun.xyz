import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
// import vanlife from "../../img/projects/vanlife.png";
import avi from "../../img/av2.png";
import { ComponentInformation } from "@/lib/projectdata";
import { useNavigate } from "react-router-dom";

function ProjectCard({ info }: { info: ComponentInformation }) {
  const navigate = useNavigate();
  if (!info) return;
  // onHover: Grow hook
  return (
    <div className="flex h-full w-full items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 transition-transform hover:scale-110">
      <Card
        className="h-[calc(100%-4px)] w-[calc(100%-4px)] cursor-pointer"
        onClick={() => navigate(info.href)}
      >
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
        <CardFooter className="mt-auto">
          <p>Hello</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProjectCard;

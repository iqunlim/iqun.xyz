"use client";
import Image from "next/image";
import imgDark from "../app/img/av2.png";

export default function Av() {
  return (
    <div className="bg-background h-[50px] w-[50px] rounded-md p-0.5">
      <Image width={50} height={50} src={imgDark.src} alt="foobar2000 logo" />
    </div>
  );
}

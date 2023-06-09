"use client";

import Image from "next/image";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { BackgroundCircles } from "./BackgroundCircles";
import Link from "next/link";
import { PageInfo } from "../typings";
import { urlFor } from "@/sanity/sanity-utils";

type Props = {
  pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: any) {
  const [text, count] = useTypewriter({
    words: [
      "npm i jake-lambert",
      "installing...",
      "done!",
      // `Hi, The Name is ${pageInfo?.name}`,
      // "Coffee-fuels-the-best-code.tsx",
      // "<ForeverEvolvingIndustry />",
    ],
    delaySpeed: 2000,
  });

  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-6 overflow-hidden text-center">
      <BackgroundCircles />
      <Image
        className="mx-auto rounded-full  object-cover object-center"
        src={urlFor(pageInfo?.heroImage).url()}
        alt={pageInfo?.name}
        width={200}
        height={200}
      />
      <div className="z-20">
        <h2 className="uppercase text-sm text-gray-500 pb-2 tracking-[16px]">{pageInfo?.role}</h2>

        <h1 className="px-24 text-xl lg:text-4xl">
          <code className={`${text == "installing..." && "text-warning"} ${text == "done!" && "text-success"}`}>
            {text}
          </code>
          <Cursor cursorColor="#f7ab0a" />
        </h1>

        <div className="pt-5">
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

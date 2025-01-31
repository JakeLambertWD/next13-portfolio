"use client";

import { Cursor, useTypewriter } from "react-simple-typewriter";
import { BackgroundCircles } from "./BackgroundCircles";
import { urlFor } from "@/sanity/sanity-utils";

export default function Hero({ pageInfo }: any) {
  const [text, count] = useTypewriter({
    words: ["Hello 👋", "Welcome 🎉", "My name is Jake 👨‍💻"],
    delaySpeed: 2000,
  });

  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-6 overflow-hidden text-center">
      <BackgroundCircles />
      <img
        className="mx-auto rounded-full object-cover object-center w-24 h-24 md:w-48 md:h-48 z-[100]"
        src={urlFor(pageInfo?.heroImage).url()}
        alt={pageInfo?.name}
      />
      <div className="z-20">
        <h2 className="uppercase text-sm text-gray-500 pb-4 tracking-[16px]">
          {pageInfo?.role}
        </h2>

        <h1 className="px-18 text-xl lg:text-4xl">
          <code
            className={`${text == "installing..." && "text-warning"} ${
              text == "done!" && "text-success"
            }`}
          >
            {text}
          </code>
          <Cursor cursorColor="#f7ab0a" />
        </h1>

        <p>RESUME</p>
      </div>
    </div>
  );
}

"use client";

import { Cursor, useTypewriter } from "react-simple-typewriter";
import { BackgroundCircles } from "./BackgroundCircles";
import { urlFor } from "@/sanity/sanity-utils";

export default function Hero({ pageInfo }: any) {
  const [text, count] = useTypewriter({
    words: ["Hello 👋", "Welcome 🎉", "My name is Jake 👨‍💻"],
    delaySpeed: 2000,
  });

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Ensure this path is correct and the file is accessible
    link.download = "resume.pdf";
    link.click();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-6 overflow-hidden text-center">
      <BackgroundCircles />
      <img
        className="mx-auto rounded-full object-cover object-center w-40 h-40 md:w-48 md:h-48"
        src={urlFor(pageInfo?.heroImage).url()}
        alt={pageInfo?.name}
      />
      <div style={{ zIndex: 50 }}>
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

        <button
          className="btn bg-transparent btn-sm mt-6 border border-[#f7ab0a] hover:bg-[#f7ab0a] hover:text-[black] text-[#f7ab0a] cursor-pointer z-[100]"
          onClick={handleResumeDownload}
        >
          Resume
        </button>
      </div>
    </div>
  );
}

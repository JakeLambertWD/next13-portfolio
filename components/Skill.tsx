"use client";

import clsx from "clsx";
import { Skill as SkillType } from "../typings";
import { urlFor } from "@/sanity/sanity-utils";
const { motion } = require("framer-motion");

type Props = {
  directionBottom?: boolean;
  tech?: SkillType;
};

export default function Skill({ directionBottom, tech }: Props) {
  // TODO sort icons into a rainbow

  return (
    <div
      className="relative flex cursor-pointer group tooltip"
      data-tip={tech?.title}
    >
      <img
        src={urlFor(tech?.image).url()}
        className={clsx(
          "object-contain w-14 h-14 filter transition duration-100 ease-in rounded-lg",
          "md:h-24 md:w-24",
          "lg:h-26 lg:w-26",
          "xl:w-28 xl:h-28",
          "group-hover:grayscale group-hover:blur-sm"
        )}
      />

      <div className="absolute z-0 w-14 h-14 transition duration-100 ease-in-out rounded-lg opacity-0 group-hover:opacity-80 group-hover:bg-white md:w-28 md:h-28 xl:w-32 xl:h-32">
        <div className="flex items-center justify-center h-full">
          <p className="text-xl sm:3xl font-bold text-black opacity-100">
            {tech?.progress}%
          </p>
        </div>
      </div>
    </div>
  );
}

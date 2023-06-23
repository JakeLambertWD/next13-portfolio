"use client";

const { motion } = require("framer-motion");

import { Experience } from "../typings";
import Card from "./Card";

// TODO remove the opacity on hover, try to make it when card in center of screen
type Props = { experiences: Experience[] };

export default function WorkExperience({ experiences }: Props) {
  return (
    <div className="relative flex flex-col items-center justify-evenly h-screen max-w-full px-1 md:px-10 mx-auto overflow-hidden text-left md:flex-row">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">Experience</h3>

      <div className="scrollbar-thin w-full mt-16 md:mt-0 flex space-x-5 overflow-x-scroll p-4 snap-x snap-mandatory scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80">
        {experiences.map((experience) => (
          <Card key={experience?._id} experience={experience} />
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Experience } from "../typings";
import { urlFor } from "@/sanity/sanity-utils";
const { motion } = require("framer-motion");

type Props = { experience: Experience };

export default function Card({ experience }: Props) {
  return (
    <article className="card glass flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] snap-center bg-[#292929] p-10 opacity-90 hover:opacity-100 cursor-pointer transition-opacity duration-100 overflow-hidden">
      <div className="h-32 w-full flex items-center justify-center">
        <motion.img
          initial={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`object-cover object-center w-[${experience.company === "VGD Limited" ? "200px" : "300px"}] my-5`}
          src={urlFor(experience?.companyImage).url()}
          alt="Profile pic"
        />
      </div>

      <div className="px-0 md:px-10 w-full">
        <div className="flex justify-between items-end">
          <p className="text-2xl font-light">{experience?.jobTitle}</p>
          <p className="text-gray-300 uppercase text-sm">
            {experience?.dateStarted} - {experience?.isCurrentlyWorkingHere ? "Present" : experience?.dateEnded}
          </p>
        </div>

        <div className="flex my-8 space-x-3">
          {experience?.technologies?.map((technology) => (
            <div key={technology._id} className="tooltip" data-tip={technology.title}>
              <Image src={urlFor(technology?.image).url()} layout="fill" alt="Tech" />
            </div>
          ))}
        </div>

        <ul className="ml-2 space-y-2 overflow-y-scroll text-base list-disc max-h-96 pr-2  scrollbar-thin scrollbar-track-black scrollbar-thumb-[#f7ab0a]">
          {experience?.points?.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

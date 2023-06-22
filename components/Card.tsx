"use client";

import Image from "next/image";
import { Experience } from "../typings";
import { urlFor } from "@/sanity/sanity-utils";
const { motion } = require("framer-motion");

type Props = { experience: Experience };
export default function Card({ experience }: Props) {
  return (
    <article className="card glass flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[400px] md:w-[600px] snap-center bg-[#292929] p-10 pt-0 md:pt-10 opacity-90 hover:opacity-100 cursor-pointer transition-opacity duration-100 overflow-hidden">
      <div className="h-24 md:h-32 w-full flex items-center justify-center">
        <motion.img
          initial={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`object-cover object-center w-[200px] my-0 md:my-5`}
          src={urlFor(experience?.companyImage).url()}
          alt="Profile pic"
        />
        {/* w-[${experience.company === "VGD Limited" ? "200px" : "300px"}] */}
      </div>
      <div className="px-0 md:px-10 w-full">
        {/* <div className="flex justify-between items-end"> */}
        <p className="text-2xl font-light mb-3">{experience?.jobTitle}</p>
        <p className="text-gray-300 uppercase text-sm">
          {experience?.dateStarted} -{" "}
          {experience?.isCurrentlyWorkingHere ? (
            <div className="badge badge-primary capitalize bg-[transparent] text-[#f7ab0a] border-[#f7ab0a] p-3">
              Working here
            </div>
          ) : (
            experience?.dateEnded
          )}
        </p>
        {/* </div> */}

        <div className="flex my-5 space-x-3">
          {experience?.technologies?.map((technology) => {
            return (
              <div key={technology._id} className="tooltip" style={{ placeSelf: "center" }} data-tip={technology.title}>
                <Image src={urlFor(technology?.image).url()} width={30} height={30} alt="Tech" />
              </div>
            );
          })}
        </div>

        <ul className="ml-2 space-y-2 overflow-y-scroll text-base list-disc max-h-96 pr-2 overflow-y-scroll h-48">
          {experience?.points?.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

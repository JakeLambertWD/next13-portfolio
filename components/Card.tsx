"use client";

import Image from "next/image";
import { Experience } from "../typings";
import { urlFor } from "@/sanity/sanity-utils";
const { motion } = require("framer-motion");

type Props = { experience: Experience };
export default function Card({ experience }: Props) {
  return (
    <article className="card glass flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[400px] md:w-[600px] snap-center bg-[#292929] p-10 pt-0 md:pt-10 opacity-90 hover:opacity-100 cursor-pointer transition-opacity duration-100 overflow-hidden">
      <div className="h-[110px] md:h-[150px] flex items-center justify-center">
        <img
          className={`object-cover object-center my-7 mx-auto w-[${
            experience.company === "VGD Limited" ? "150px" : "200px"
          }] md:w-[${experience.company === "VGD Limited" ? "200px" : "300px"}]`}
          src={urlFor(experience?.companyImage).url()}
          alt="Profile pic"
        />
      </div>

      <div className="px-0 md:px-10 w-full">
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

        <div className="flex my-5 space-x-3">
          {experience?.technologies?.map((technology) => {
            return (
              <div key={technology._id} className="tooltip" style={{ placeSelf: "center" }} data-tip={technology.title}>
                <Image src={urlFor(technology?.image).url()} width={30} height={30} alt="Tech" />
              </div>
            );
          })}
        </div>

        <ul className="ml-2 space-y-2 overflow-y-scroll text-base list-disc max-h-96 pr-2 overflow-y-scroll h-48 md:h-56 lg:h-64">
          {experience?.points?.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

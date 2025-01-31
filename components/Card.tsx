"use client";

import Image from "next/image";
import { Experience } from "../typings";
import { urlFor } from "@/sanity/sanity-utils";

type Props = { experience: Experience };
export default function Card({ experience }: Props) {
  // TODO: Edit the project screenshots in Lightroom
  // TODO: Edit technology icons to a cartoon design for example using AI
  // TODO: Edit Company logos in Lightroom

  return (
    <article className="card glass flex flex-col rounded-lg items-center space-y-1 flex-shrink-0 w-[350px] md:w-[430px] snap-center bg-[#292929] p-5 pt-10 opacity-90 hover:opacity-100 cursor-pointer transition-opacity duration-100 overflow-hidden">
      <div className="h-[100px] md:h-[150px] flex items-center justify-center">
        <img
          className={`object-cover object-center mb-7 ${
            experience.company === "Anmut" ? "mt-[-30px]" : ""
          } mx-auto w-[200px] ${
            experience.company === "VGD Limited"
              ? "md:w-[180px]"
              : "md:w-[250px]"
          }`}
          src={urlFor(experience?.companyImage).url()}
          alt="Profile pic"
        />
      </div>

      <div className="px-0 md:px-10 w-full">
        <p className="text-2xl font-light mb-3">{experience?.jobTitle}</p>
        <div className="flex justify-between">
          <p className="text-gray-300 uppercase text-sm">
            {experience?.dateStarted} -{" "}
            {experience?.dateEnded ? experience?.dateEnded : "Present"}
          </p>
          {experience?.isCurrentlyWorkingHere && (
            <div className="badge badge-primary capitalize bg-[transparent] text-[#f7ab0a] border-[#f7ab0a] p-3 float-right">
              Working here
            </div>
          )}
        </div>

        <div className="flex my-9 space-x-3">
          {experience?.technologies?.map((technology) => {
            return (
              <div
                key={technology._id}
                className="tooltip"
                style={{ placeSelf: "center" }}
                data-tip={technology.title}
              >
                <Image
                  src={urlFor(technology?.image).url()}
                  width={30}
                  height={30}
                  alt="Tech"
                />
              </div>
            );
          })}
        </div>

        <ul className="ml-2 space-y-2 h-[30px] overflow-y-scroll text-base list-disc pr-2 text-md">
          {experience?.points?.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
    </article>
  );
}

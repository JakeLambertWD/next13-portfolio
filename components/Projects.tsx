"use client";

import Link from "next/link";
import { Card } from "react-daisyui";
import { ExternalLink } from "react-external-link";

import { Project } from "../typings";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity-utils";

const { motion } = require("framer-motion");

type Props = {
  personalProjects: Project[];
};
export default function Projects({ personalProjects }: Props) {
  const reverseProjects = personalProjects.slice().sort().reverse();

  return (
    <div className="relative z-0 flex flex-col items-center h-screen max-w-full mx-auto overflow-hidden text-left md:flex-row justify-evenly">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="scrollbar p-3 scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80 scrollbar-thin relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20">
        {reverseProjects.map((project, i) => {
          return (
            <div
              key={i}
              className="card glass w-[350px] md:w-[420px] h-[530px] md:h-[580px] mt-32 snap-center flex-shrink-0 mx-8 md: mx-4 opacity-90 transition-opacity hover:opacity-100 duration-100"
            >
              <figure>
                <img
                  className="w-full object-cover h-[150px] md:h-[250px]"
                  src={urlFor(project?.image).url()}
                  alt="car!"
                />
              </figure>
              <div className="card-body h-96 pt-6 gap-0">
                <div className="flex w-full justify-between">
                  <h6 className="mb-6 text-xl font-light">{project?.title}</h6>

                  <div className="flex space-x-3 pb-5 ">
                    {project?.technologies?.map((tech) => {
                      return (
                        <div
                          key={tech?._id}
                          className="tooltip"
                          data-tip={tech.title}
                        >
                          <Image
                            src={urlFor(tech?.image).url()}
                            height={30}
                            width={30}
                            alt="Tech"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="card-actions mb-6 mx-auto">
                  <ExternalLink href={project?.linkToBuild}>
                    <button className="btn btn-primary btn-sm">
                      View site
                    </button>
                  </ExternalLink>
                  <ExternalLink href={project?.linkToCode}>
                    <button className="btn btn-primary btn-sm">
                      View code
                    </button>
                  </ExternalLink>
                </div>

                <ul className="ml-2 space-y-2 overflow-y-scroll text-base list-disc max-h-96 pr-2">
                  {project?.points?.map((point, i) => (
                    <div key={i}>
                      <li className="text-center">{point}</li>
                      <div className="divider my-1"></div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className='w-full absolute top-[30%] bg-[#f7ab0a]/40 left-0 h-[300px] -skew-y-6' /> */}
    </div>
  );
}

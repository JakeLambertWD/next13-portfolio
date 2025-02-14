"use client";

import { Skill as SkillType } from "../typings";
import Skill from "./Skill";

type Props = { technologies: SkillType[] };

export default function Skills({ technologies }: Props) {
  const removeUnwanted = technologies?.filter((tech) => {
    return (
      tech.title !== "WordPress" &&
      tech.title !== "Shopify" &&
      tech.title !== "Git" &&
      tech.title !== "HTML" &&
      tech.title !== "CSS"
    );
  });

  return (
    <div className="h-screen relative flex flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 justify-center xl:space-y-0 mx-auto items-center">
      <h3 className="absolute w-full text-center top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        My Skills
      </h3>

      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-8 mt-28 md:mt-0">
        {removeUnwanted
          ?.slice(0, removeUnwanted.length / 2)
          .map((tech) => <Skill key={tech._id} tech={tech} directionBottom />)}
        {removeUnwanted
          ?.slice(removeUnwanted.length / 2, removeUnwanted.length)
          .map((tech) => <Skill key={tech._id} tech={tech} />)}
      </div>
    </div>
  );
}

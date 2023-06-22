"use client";

import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { ExternalLink } from "react-external-link";
import { Social } from "../typings";
const { motion } = require("framer-motion");

type Props = { socials: Social[] };

export default function Header({ socials }: Props) {
  return (
    <header className="sticky top-0 z-20 flex justify-between px-5 py-2 mx-auto max-w-7xl">
      <div className="flex flex-row items-start">
        {socials?.map((icon) => {
          const titleToLowerCase = icon.title.toLocaleLowerCase();

          return (
            <ExternalLink key={icon._id} href={icon.url}>
              <SocialIcon network={titleToLowerCase} key={icon._id} fgColor="gray" bgColor="transparent" />
            </ExternalLink>
          );
        })}
      </div>

      <Link href="#contact">
        <div className="flex flex-row items-center text-gray-300 cursor-pointer">
          <SocialIcon network="email" fgColor="gray" bgColor="transparent" />
          <p className="hidden text-sm text-gray-400 uppercase md:inline-flex">Get In Touch!</p>
        </div>
      </Link>
    </header>
  );
}

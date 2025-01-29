"use client";

import { SocialIcon } from "react-social-icons";
import { ExternalLink } from "react-external-link";
import Link from "next/link";
import { Social } from "../typings";
import { NAVIGATION_LINKS } from "@/app/constants";

type Props = { socials: Social[] };

export default function Header({ socials }: Props) {
  // TODO: copy code from another project to change the favicon

  return (
    <header className="sticky top-0 z-20 flex justify-between px-12 py-2 mx-auto max-w-8xl bg-[#242424]">
      <div className="flex flex-row items-start">
        {socials?.map((icon) => {
          const titleToLowerCase = icon.title.toLocaleLowerCase();

          return (
            <ExternalLink key={icon._id} href={icon.url}>
              <SocialIcon
                network={titleToLowerCase}
                key={icon._id}
                fgColor="gray"
                bgColor="rgb(36, 36, 36)"
              />
            </ExternalLink>
          );
        })}
      </div>

      <div className="flex flex-row space-x-4 items-center text-gray-300 cursor-pointer ">
        {NAVIGATION_LINKS.map((link) => (
          <Link key={link} href={`#${link.toLowerCase()}`}>
            <p className="hidden text-xs text-gray-400 uppercase md:inline-flex">
              {link}
            </p>
          </Link>
        ))}
      </div>
    </header>
  );
}

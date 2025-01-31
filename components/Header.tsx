"use client";

import { SocialIcon } from "react-social-icons";
import { ExternalLink } from "react-external-link";
import { Social } from "../typings";
import { NAVIGATION_LINKS } from "@/app/constants";
import { Link } from "react-daisyui";

type Props = { socials: Social[] };

export default function Header({ socials }: Props) {
  // TODO: copy code from another project to change the favicon
  return (
    <header className="sticky top-0 z-20 flex justify-between px-12 py-2 mx-auto max-w-8xl bg-[#242424]">
      <div className="flex flex-row items-start">
        {socials?.map((icon) => {
          const titleToLowerCase = icon.title.toLocaleLowerCase();

          return (
            <div
              key={icon._id}
              onClick={() =>
                window.open(icon.url, "_blank", "noopener noreferrer")
              }
              style={{ cursor: "pointer" }}
            >
              <SocialIcon
                network={titleToLowerCase}
                fgColor="gray"
                bgColor="rgb(36, 36, 36)"
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-row space-x-2 items-center text-gray-300 cursor-pointer ">
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

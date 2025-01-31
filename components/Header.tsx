"use client";

import { SocialIcon } from "react-social-icons";
import { Social } from "../typings";
import { useEffect, useState } from "react";

type Props = { socials: Social[] };

const sections = ["projects", "skills", "experience", "about", "contact"];

export default function Header({ socials }: Props) {
  // TODO: copy code from another project to change the favicon
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <header
      className="sticky top-0 flex justify-between px-12 py-2 mx-auto max-w-8xl bg-[#242424]"
      style={{ zIndex: 101 }}
    >
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

      <nav className="hidden md:flex absolute right-8 top-4 flex flex-col items-end text-gray-300 cursor-pointer">
        {sections.map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={`text-xs text-right cursor-pointer py-1 text-gray-400 uppercase md:inline-flex ${
              activeSection === section
                ? "border-r-2 pr-2 border-[#f7ab0a]"
                : ""
            }`}
            style={{ fontFamily: "monospace" }}
          >
            {section}
          </a>
        ))}
      </nav>
    </header>
  );
}

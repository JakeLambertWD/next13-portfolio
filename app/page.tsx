import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import ContactMe from "@/components/ContactMe";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import {
  getPageinfo,
  getSocials,
  getExperience,
  getSkill,
  getProjects,
} from "@/sanity/sanity-utils";
import { urlFor } from "@/sanity/sanity-utils";
import Image from "next/image";
import { ExternalLink } from "react-external-link";

export default async function Home() {
  const socials = await getSocials();
  const pageInfo = await getPageinfo();
  const experiences = await getExperience();
  const skills = await getSkill();
  const projects = await getProjects();

  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory scrollbar-none overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80 scrollbar-thin scrollbar">
      <Header socials={socials} />

      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="projects" className="snap-center relative">
        <h3 className="absolute w-full text-center top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
          Projects
        </h3>

        <div className="h-screen scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80 scrollbar-thin relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory p-3 items-center z-20">
          {projects.map((project) => (
            <div className="group relative cursor-pointer items-center w-[450px] h-[350px] snap-center flex-shrink-0 mx-4 transition-opacity duration-100 items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-xl">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                src={urlFor(project?.image).url()}
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <h1 className="text-xl  text-white">{project?.title}</h1>
                <div className="mb-3 mt-6  text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
                    <button className="btn btn-primary btn-sm mr-2">
                      View site
                    </button>
                  </ExternalLink>
                  <ExternalLink href={project?.linkToCode}>
                    <button className="btn btn-primary btn-sm">
                      View code
                    </button>
                  </ExternalLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="snap-center">
        <Projects personalProjects={projects} />
      </section>

      <section id="skills" className="snap-center">
        <Skills technologies={skills} />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="contact" className="snap-center">
        <ContactMe />
      </section>

      {/* <BackToTop pageInfo={pageInfo} /> */}
    </div>
  );
}

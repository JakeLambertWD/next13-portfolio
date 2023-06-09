import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import { getPageinfo, getSocials, getExperience, getSkill, getProjects } from "@/sanity/sanity-utils";

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

      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills" className="snap-center">
        <Skills technologies={skills} />
      </section>

      <section id="projects" className="snap-center">
        <Projects personalProjects={projects} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="contact" className="snap-center">
        <ContactMe />
      </section>

      {/* <Link href="#hero">
        <footer className="sticky w-full cursor-pointer bottom-7 bottom-5 tooltip" data-tip="Back to Top">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <Image src={urlFor(pageInfo?.heroImage).url()} width="100%" height="100%" alt="Profile pic" />
            </div>
          </div>
        </footer>
      </Link> */}
    </div>
  );
}

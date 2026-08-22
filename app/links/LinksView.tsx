"use client";

const { motion } = require("framer-motion");
import dynamic from "next/dynamic";
import { Bebas_Neue, Manrope } from "next/font/google";
import FeaturedLinkCard from "./FeaturedLinkCard";
import LinkButton from "./LinkButton";

const SocialIcon = dynamic(
  () => import("react-social-icons").then((module) => module.SocialIcon),
  { ssr: false }
);

// fonts
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function LinksView() {
  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden bg-[#0a0c0e] ${manrope.className}`}
    >
      {/* ambient glow, echoes the teal/orange grade from the preset pack */}
      <div className="pointer-events-none absolute -left-16 -top-32 h-[420px] w-[420px] rounded-full bg-[#5eb8b0]/[0.16] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-40 h-[460px] w-[460px] rounded-full bg-[#d97706]/[0.12] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center px-6 py-16 sm:py-20"
      >
        {/* identity */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1
            className={`text-4xl leading-none tracking-wide text-[#f4f1ea] ${bebasNeue.className}`}
          >
            JAKE LAMBERT
          </h1>
          <p className="text-sm font-semibold tracking-widest text-[#5eb8b0]">
            @lamberts.lens
          </p>
          <p className="mt-1 text-sm text-[#8a8f94]">
            London street &amp; cityscape photography
          </p>
        </div>

        {/* featured: preset pack */}
        <div className="mt-9 w-full">
          <FeaturedLinkCard
            href="#" // TODO: replace with the real checkout link once /presets is live
            title="Lightroom Preset Pack"
            subtitle="49 presets · 9 collections"
            price="£10"
          />
        </div>

        {/* secondary links */}
        <div className="mt-4 flex w-full flex-col gap-3">
          <LinkButton
            href="#" // TODO: replace with the real VSGO affiliate link + code
            title="VSGO Gear Discount"
            subtitle="Code: [VSGO CODE]"
          />
          <LinkButton
            href="#" // TODO: replace with the real photography portfolio URL
            title="Photography Portfolio"
            subtitle="Full galleries & bookings"
          />
        </div>

        {/* footer */}
        <SocialIcon
          network="instagram"
          href="https://instagram.com/lamberts.lens"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12"
          fgColor="gray"
          bgColor="#0a0c0e"
          style={{ height: 40, width: 40 }}
        />
      </motion.div>
    </main>
  );
}

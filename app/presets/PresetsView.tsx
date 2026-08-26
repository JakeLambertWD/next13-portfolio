"use client";

const { motion } = require("framer-motion");
import { LockClosedIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Bebas_Neue, Manrope } from "next/font/google";
import OrderCard from "./OrderCard";
import CollectionCard from "./CollectionCard";
import BeforeAfterCard from "./BeforeAfterCard";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const COLLECTIONS = [
  {
    title: "Signature Grade",
    description: "Core cinematic teal-orange, the versatile hero look",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5eb8b0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    imageSrc: "/baker-street.jpg",
    imagePosition: "50% 65%",
  },
  {
    title: "Night Skyline",
    description: "Deep blue-black cityscapes, glowing windows",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5eb8b0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21V10l4-3 4 3v11" />
        <path d="M11 21V6l4-3 4 3v15" />
        <circle cx="18.5" cy="6.5" r="1.4" fill="#5eb8b0" stroke="none" />
      </svg>
    ),
    imageSrc: "/south-quay.jpg",
    imagePosition: "50% 85%",
  },
  {
    title: "Urban Geometry",
    description: "Puddle reflections and spiral staircases",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c9cdd1"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 20c0-9 5-9 5-14M9 20c0-6 4-6 4-10M13 20c0-4 3-4 3-7M17 20c0-2 2-2 2-4" />
      </svg>
    ),
    imageSrc: "/dlr.jpg",
    imagePosition: "50% 45%",
  },
  {
    title: "Motion Trails",
    description: "Long-exposure light trails, panning shots",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d97706"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17h3l3-9 4 14 3-9h5" />
      </svg>
    ),
    imageSrc: "/light-trails.jpg",
    imagePosition: "50% 83%",
  },
  {
    title: "Cinematic Underground",
    description: "Cool cyan-teal Tube & train scenes",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5eb8b0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 20V11a8 8 0 0 1 16 0v9" />
        <path d="M4 20h16M8 20v-6M16 20v-6" />
      </svg>
    ),
    imageSrc: "/hampstead-underground.jpg",
    imagePosition: "50% 45%",
  },
  {
    title: "Golden Dusk",
    description: "Blue-violet sky, magenta highlight edges",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d97706"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 18a7 7 0 0 1 14 0" />
        <path d="M3 18h18M12 8V5M6.5 9.5 5 8M17.5 9.5 19 8" />
      </svg>
    ),
    imageSrc: "/east-india.jpg",
    imagePosition: "50% 42%",
  },
  {
    title: "Moody Atmosphere",
    description: "Grey overcast daylight, warm stone midtones",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c9cdd1"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 15h18" />
        <path d="M5 15c0-4 2-6 7-6s7 2 7 6" />
        <path d="M3 19h18" />
      </svg>
    ),
    imageSrc: "/carpark.jpg",
    imagePosition: "50% 49%",
  },
  {
    title: "Electric Nights",
    description: "Neon and traffic-light accented night shots",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d97706"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
      </svg>
    ),
    imageSrc: "/mousetrap.jpg",
    imagePosition: "50% 55%",
  },
  {
    title: "Distant Shores",
    description: "Travel and street photography abroad",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5eb8b0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />
      </svg>
    ),
    imageSrc: "/lisbon.jpg",
    imagePosition: "50% 96%",
  },
  {
    title: "Adventure Earthy",
    description: "Sun-baked trails, warm ochre and terracotta tones",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d97706"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="17" cy="6" r="2.5" />
        <path d="M2 20 8 10l4 5 3-4 7 9H2z" />
      </svg>
    ),
    imageSrc: "/hamp.jpg",
    imagePosition: "50% 53%",
  },
] as const;

export default function PresetsView() {
  return (
    <main
      className={`min-h-screen w-full bg-[#0a0c0e] text-[#f4f1ea] ${manrope.className}`}
    >
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-6 lg:px-16">
        <div className="flex items-baseline gap-2.5">
          <span className={`text-lg tracking-wide ${bebasNeue.className}`}>
            LAMBERTS.LENS
          </span>
          <span className="text-xs font-semibold tracking-wide text-[#5eb8b0]">
            PRESETS
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#8a8f94]">
          <LockClosedIcon className="h-3.5 w-3.5 text-[#5eb8b0]" />
          SECURE CHECKOUT
        </div>
      </div>

      {/* hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-10 px-6 py-14 pt-4 lg:grid-cols-[1fr_360px] lg:gap-14 lg:px-16 lg:py-16"
      >
        <div className="flex flex-col gap-7">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight lg:text-[42px]">
              50 Lightroom presets
            </h1>
            <p className="mt-3.5 max-w-xxl text-[12px] leading-relaxed text-[#c9cdd1] lg:text-[17px]">
              Presets are a starting point, and results vary with each photo.
              Adjust white balance, exposure, or temperature as needed,
              especially in different lighting conditions.
            </p>
          </div>

          {/* TODO: swap in a real before/after pair once you have one exported from the actual presets */}
          <BeforeAfterCard
            beforeSrc="/hampstead-underground-raw.jpg"
            afterSrc="/hampstead-underground.jpg"
          />

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <ArrowDownTrayIcon className="h-[18px] w-[18px] text-[#5eb8b0]" />
              <span className="text-[13px] text-[#c9cdd1]">
                Instant download
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LockClosedIcon className="h-[18px] w-[18px] text-[#5eb8b0]" />
              <span className="text-[13px] text-[#c9cdd1]">
                Secure Stripe checkout
              </span>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-7 lg:self-start">
          <OrderCard />
        </div>
      </motion.div>

      {/* collections grid */}
      <div className="px-6 pb-16 lg:px-16">
        <div className="mb-7">
          <h3 className="text-2xl font-extrabold">
            Ten collections. One purchase.
          </h3>
          <p className="mt-2 text-sm text-[#8a8f94]">
            Every pack is grounded in real edits from real photos — not guesses
            at a look.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((collection) => (
            <CollectionCard
              key={collection.title}
              icon={collection.icon}
              title={collection.title}
              description={collection.description}
              imageSrc={collection.imageSrc}
              imagePosition={collection.imagePosition}
            />
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-8 text-xs text-[#63696e] lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <span>Presets by Jake Lambert · @lamberts.lens</span>
        <span>Instant digital download · No physical item is shipped</span>
      </div>
    </main>
  );
}

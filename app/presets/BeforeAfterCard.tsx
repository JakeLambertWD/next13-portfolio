"use client";

type Props = {
  beforeSrc: string;
  afterSrc: string;
};

// Dummy before/after pair for now — both sides point at the same photo with
// a CSS filter standing in for a real grade. Swap beforeSrc/afterSrc for a
// genuine unedited vs. Lightroom-exported pair once one's ready.
export default function BeforeAfterCard({ beforeSrc, afterSrc }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="relative h-[280px] overflow-hidden rounded-2xl border border-white/10 md:h-[360px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${beforeSrc}')` }}
        />
        <div className="absolute left-3 top-3 rounded-md bg-[#0a0c0e]/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#c9cdd1] backdrop-blur-sm">
          Before
        </div>
      </div>

      <div className="relative h-[280px] overflow-hidden rounded-2xl border border-[#5eb8b0]/40 md:h-[360px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${afterSrc}')`,
            filter:
              "saturate(1.3) contrast(1.12) brightness(1.03) hue-rotate(-4deg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e]/25 via-transparent to-[#5eb8b0]/10" />
        <div className="absolute right-3 top-3 rounded-md bg-[#5eb8b0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0a0c0e]">
          After - Night Skyline Preset
        </div>
      </div>
    </div>
  );
}

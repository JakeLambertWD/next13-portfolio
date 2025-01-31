"use client";

const { motion } = require("framer-motion");

interface Props {
  backgroundColor?: string;
}

export const BackgroundCircles = ({ backgroundColor }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        scale: [1, 2, 2, 4, 1],
        opacity: [0, 0.2, 0.4, 0.6, 0.8, 1],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{ duration: 1 }}
      className="relative flex justify-center items-center "
      style={{ zIndex: 1 }}
    >
      <div className="absolute border [#333333] rounded-full h-[200px] w-[200px] mt-52 animate-ping" />
      <div className="absolute border border-[#bbafaf] rounded-full h-[300px] w-[300px] mt-52 animate-ping" />
      <div className="absolute border border-[#333333] rounded-full h-[500px] w-[500px] mt-52 animate-ping" />
      <div className="absolute border border-[#f7ab0a]  rounded-full h-[650px] w-[650px] mt-52 animate-pulse opacity-20" />
      <div className="absolute border border-[#333333]  rounded-full h-[800px] w-[800px] mt-52 " />
    </motion.div>
  );
};

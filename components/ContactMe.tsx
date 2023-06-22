"use client";

import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe() {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    window.location.href = `mailto:jakelambert1@hotmail.co.uk?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message}`;
  };

  return (
    <div className="relative flex flex-col items-center h-screen  px-2 sm:px-10 mx-auto overflow-hidden text-left md:flex-row justify-evenly">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg sm:text-2xl">Contact me</h3>

      <div className="flex flex-col space-y-10 bg-red-200">
        <h4 className="text-lg sm:text-4xl font-semibold text-center ">If you like what you see, contact me!</h4>

        <div className="space-y-6 sm:space-y-10">
          <div className="flex justify-start sm:justify-center space-x-5 ">
            <PhoneIcon className="text-[#f7ab0a] h-7 w-7 animate-pulse" />
            <p className="text-lg sm:text-2xl">07792703081</p>
          </div>

          <div className="flex justify-start sm:justify-center space-x-5">
            <EnvelopeIcon className="text-[#f7ab0a] h-7 w-7 animate-pulse" />
            <p className="text-lg sm:text-2xl">jakelambert1@hotmail.co.uk</p>
          </div>

          <div className="flex justify-start sm:justify-center space-x-5">
            <MapPinIcon className="text-[#f7ab0a] h-7 w-7 animate-pulse" />
            <p className="text-lg sm:text-2xl">29 Cross Street, Islington, London</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-auto space-y-2 w-fit">
          <div className="flex space-x-2">
            <input {...register("name")} placeholder="Name" className="contactInput" type="text" />
            <input {...register("email")} placeholder="Email" className="contactInput" type="email" />
          </div>

          <input {...register("subject")} placeholder="Subject" className="contactInput" type="text" />

          <textarea {...register("message")} placeholder="Message" className="contactInput" />
          <button
            type="submit"
            className="bg-[#f7ab0a] py-3 sm:py-5 px-4 sm:px-10 rounded-md text-black font-bold text-sm sm:text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMe() {
  const { register } = useForm<FormInputs>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e: any) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: "jakelambert1@icloud.com",
      to_name: "Jake Lambert",
      subject: subject,
      message: message,
      email: email,
    };

    emailjs
      .send(
        "service_r0ku83v",
        "template_fmcd1ly",
        templateParams,
        "bsystnI8-oL6ESNKr"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        },
        (error) => {
          alert("Failed to send message, please try again.");
        }
      );
  };

  return (
    <div className="relative flex flex-col items-center h-screen  px-2 sm:px-10 mx-auto overflow-hidden text-left md:flex-row justify-evenly">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-lg sm:text-2xl">
        Contact me
      </h3>

      <div className="flex flex-col space-y-10 w-[350px] md:w-fit mt-10">
        <h4 className="text-lg sm:text-2xl font-semibold text-center mt-5">
          If you like what you see, contact me!
        </h4>

        <div className="space-y-4 sm:space-y-5">
          <div className="flex justify-start sm:justify-center space-x-5 ">
            <PhoneIcon className="text-[#f7ab0a] h-7 w-7 animate-pulse" />
            <p className="text-lg sm:text-xl">07792703081</p>
          </div>

          <div className="flex justify-start sm:justify-center space-x-5">
            <EnvelopeIcon className="text-[#f7ab0a] h-7 w-7 animate-pulse" />
            <p className="text-lg sm:text-xl">jakelambert1@icloud.com</p>
          </div>

          <div className="flex justify-start sm:justify-center space-x-5">
            <MapPinIcon className="text-[#f7ab0a] h-7 w-7 animate-pulse" />
            <p className="text-lg sm:text-xl">Islington, London</p>
          </div>
        </div>

        <form
          onSubmit={sendEmail}
          className="flex flex-col space-y-2 w-full mx-auto"
        >
          <input
            {...register("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="contactInput"
            type="text"
          />
          <input
            {...register("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="contactInput"
            type="email"
          />
          <input
            {...register("subject")}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="contactInput"
            type="text"
          />
          <textarea
            {...register("message")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="contactInput"
          />
          <button
            type="submit"
            className="bg-[#f7ab0a] py-3 sm:py-5 px-2 sm:px-10 rounded-md text-black font-bold text-sm sm:text-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

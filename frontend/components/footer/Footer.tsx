import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <div className="w-full h-[auto] bg-[#000] text-[15px] leading-6 text-neutral-500 pt-[45px] pb-20 px-0 border-t-4 border-[#393939] ">
      <div className="w-[90%] md:w-[70%] h-full flex flex-col mx-auto mb-4">
        <div className="flex  w-full justify-center items-center">
          <img
            src="./logo.gif"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />

          <p className="w-full lg:w-[60%] mt-[1%]">
            <b>"Play Pause"</b> is a is user-friendly and responsive Progressive
            Web Application that allows users to engage with various types of
            multimedia content, including movies, songs, and memes.Additionally,
            there is a feature that enables real-time movie watching with
            friends.
          </p>
        </div>
        <div className=" w-full text-[gray] text-[1rem] mx-[0%] my-[2%] px-[0%]  hidden sm:block">
          <ul className="w-full flex justify-center items-center">
            <li className="inline-block hover:text-[#aaa] mx-[30px] my-0">
              <a href="#">Home</a>
            </li>
            <li className="inline-block hover:text-[#aaa] mx-[30px] my-0">
              <a href="#">About Us</a>
            </li>
            <li className="inline-block hover:text-[#aaa] mx-[30px] my-0">
              <a href="#">Privacy Policy</a>
            </li>
            <li className="inline-block hover:text-[#aaa] mx-[30px] my-0">
              <a href="#">Terms &amp; Conditions</a>
            </li>
            <li className="inline-block hover:text-[#aaa] mx-[30px] my-0">
              <a href="#">Contact us</a>
            </li>
          </ul>
        </div>
        <div className=" w-full text-[gray] text-[2rem] mx-[0%] my-[1%] px-[0%]  ">
          <ul className="w-full flex justify-center items-center  ">
            <li className="inline-block hover:text-[#49c6fc] mx-[30px] my-0">
              <a href="https://www.linkedin.com/in/rahul-kumar-r1999/">
                <AiFillLinkedin />
              </a>
            </li>
            <li className="inline-block hover:text-[#363636] mx-[30px] my-0">
              <a href="https://github.com/devilGhostman">
                <AiFillGithub />
              </a>
            </li>
            <li className="inline-block hover:text-[#fa9069] mx-[30px] my-0">
              <a href="mailto:kumrahul1999@gmail.com">
                <SiGmail />
              </a>
            </li>
          </ul>
        </div>
        <div className=" w-full flex justify-center items-center mt-2 pt-2 border-t-4 border-[red]">
          PLAY PAUSE Copyright © 2023 - All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;

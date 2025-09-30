import { GoDotFill } from "react-icons/go";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoIosArrowForward,
} from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

export const Footer = () => {
  return (
    <section
      className="bg-shade-400 flex w-full flex-col justify-center gap-4 overflow-hidden p-8 md:flex-row md:gap-16"
      id="footer"
    >
      <div className="flex flex-col gap-4">
        <p className="max-w-md min-w-2xs text-2xl font-semibold">
          Side project made by Khanh
        </p>
        <div className="flex flex-col">
          {/* Email */}
          <div className="flex items-center gap-1">
            <IoMail />
            <a
              href="mailto:Khanh1234409@gmail.com"
              className="text-blue-400 hover:underline"
            >
              Khanh1234409@gmail.com
            </a>
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-1">
            <IoLogoGithub />
            <a
              className="text-blue-400 hover:underline"
              href="https://github.com/kqluong114"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Kqluong114
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-1">
            <IoLogoLinkedin />
            <a
              className="text-blue-400 hover:underline"
              href="https://linkedin.com/in/khanh-luong-4471561a1"
              target="_blank"
              rel="noopener noreferrer"
            >
              /in/Khanh-Luong
            </a>
          </div>
        </div>
      </div>
      <div className="text-mist-400 w-[50%] min-w-[50px] border-1 md:hidden"></div>
      <div className="flex flex-col gap-4 text-2xl">
        <p className="font-semibold">View my other works:</p>
        <a
          className="bg-mist-400 hover:bg-mist-200 w-fit rounded-2xl px-4 py-2 text-2xl transition-all duration-150 hover:cursor-pointer"
          href="https://kqluong114.github.io/"
        >
          Portfolio <IoIosArrowForward className="inline" />
        </a>
      </div>
    </section>
  );
};

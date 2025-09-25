import { BsTranslate } from "react-icons/bs";

const SideMenu = ({ hamburgerIsOpen, setHamburgerIsOpen }) => {
  return (
    <>
      <button
        className={`absolute top-0 left-0 h-screen w-screen bg-black transition-all duration-150 ${hamburgerIsOpen ? "opacity-30" : "invisible opacity-0"}`}
        onClick={() => setHamburgerIsOpen(false)}
      ></button>
      <div
        className={`absolute top-0 flex h-screen w-[300px] flex-col bg-white transition-all duration-150 ${hamburgerIsOpen ? "left-0" : "left-[-300px]"}`}
      >
        {/* <Link
          className="transition-all duration-250 hover:text-[oklch(1_.08_174)] border-b-2 border-transparent hover:border-[oklch(1_.08_174)]"
          key={"home"}
          to="/home"
        >
          {item}
        </Link> */}
      </div>
    </>
  );
};

export default SideMenu;

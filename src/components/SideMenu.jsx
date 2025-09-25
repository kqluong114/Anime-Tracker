import { BsTranslate } from "react-icons/bs";
import { Link } from "react-router-dom";

const SideMenu = ({ sideMenuIsOpen, setSideMenuIsOpen }) => {
  const navItems = ["Home", "Popular", "Recommended"];
  return (
    <>
      <button
        className={`absolute top-0 left-0 h-screen w-screen bg-black transition-all duration-150 ${sideMenuIsOpen ? "opacity-50" : "invisible opacity-0"}`}
        onClick={() => setSideMenuIsOpen(false)}
      ></button>
      <div
        className={`bg-shade-400 absolute top-0 flex h-screen w-[300px] flex-col text-2xl transition-all duration-150 ${sideMenuIsOpen ? "left-0" : "left-[-300px]"}`}
      >
        <div className="bg-shade-600 flex flex-col gap-2 p-4">
          <Link className="bg-mist-600 hover:bg-mist-400 w-full rounded-2xl p-2 text-center transition-colors duration-150">
            Login
          </Link>
          <p className="text-sm">
            No account?{" "}
            <Link className="text-pink-300 hover:underline">Register</Link>
          </p>
        </div>
        <ul className="flex w-full flex-col gap-2 p-4">
          {navItems.map((item) => {
            return (
              <li className="w-full" key={item.toLowerCase()}>
                <Link
                  className="block w-full border-b-2 border-transparent transition-all duration-250 hover:border-[oklch(1_.08_174)] hover:text-[oklch(1_.08_174)]"
                  to={`/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className={`group bg-shade-600 ite hover:bg-shade-400 absolute top-2 left-[310px] flex h-10 w-10 cursor-pointer flex-col items-center rounded p-2 transition-all duration-150 ${sideMenuIsOpen ? "opacity-100" : "invisible opacity-0"}`}
          onClick={() => setSideMenuIsOpen(false)}
        >
          <div className="bg-mist-600 group-hover:bg-mist-400 absolute top-[50%] h-1 w-8 translate-y-[-50%] rotate-45 rounded-2xl transition-colors duration-150"></div>
          <div className="bg-mist-600 group-hover:bg-mist-400 absolute top-[50%] h-1 w-8 translate-y-[-50%] rotate-135 rounded-2xl transition-colors duration-150"></div>
        </button>
      </div>
    </>
  );
};

export default SideMenu;

const SideMenu = ({ hamburgerIsOpen, setHamburgerIsOpen }) => {
  return (
    <div className="flex flex-col max-w-[300px] absolute h-full">
      <Link
        className="transition-all duration-250 hover:text-[oklch(1_.08_174)] border-b-2 border-transparent hover:border-[oklch(1_.08_174)]"
        key={item}
        to={item === "Home" ? "/" : "/" + item.toLowerCase()}
      >
        {item}
      </Link>
    </div>
  );
};

export default SideMenu;

import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function SideBar() {
  const [nav, setNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Set breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center mt-1 shadow-sm">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={isMobile ? 20 : 30} />
        </div>
      </div>

      {nav ? (
        <div
        onClick={() => setNav(!nav)}
        className="bg-black/20 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[220px] sm:w-[380px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[220px] sm:w-[380px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-2 top-2 cursor-pointer"
        />
        <h2 className="text-2xl font-semibold text-slate-500 p-2">
          2Hand<span className="font-bold text-slate-700">Product</span>
        </h2>
        <nav className="">
            <h1>xxxxxxxxx</h1>
        </nav>
      </div>
    </div>
  );
}

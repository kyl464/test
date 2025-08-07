import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    console.log("SESSION USER:", session?.user);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEditProfile = () => {
    router.push("/profile/edit"); // arahkan ke halaman edit profile
  };

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 border-gray-200 transition-all duration-300 ${
        scrolling ? "bg-[#F8F3D9] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/home" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span
            className={`self-center text-2xl font-semibold transition-colors duration-300 ${
              scrolling ? "text-black" : "text-white"
            }`}
          >
            B'Stay
          </span>
        </Link>

        <div
          className="flex md:order-2 space-x-3 md:space-x-0 relative"
          ref={dropdownRef}
        >
          {session ? (
            <>
              <button
                type="button"
                onClick={handleProfileClick}
                className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#514D3E]"
              >
                <img
                  src={
                    session?.user?.image
                      ? session.user.image
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <button
                    onClick={handleEditProfile}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-gray-600 font-semibold bg-[#EBE5C2] hover:bg-[#D6CBA8] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              Get Started
            </button>
          )}
        </div>

        <div className="hidden md:flex md:w-auto md:order-1">
          <ul className="flex space-x-8 font-medium">
            {[
              { name: "Location", path: "/location" },
              { name: "About us", path: "/about" },
              { name: "Services", path: "/services" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block py-2 px-3 rounded-sm transition-colors duration-200 ${
                    router.pathname === item.path
                      ? scrolling
                        ? "text-black font-semibold"
                        : "text-[#EBE5C2] font-semibold"
                      : scrolling
                      ? "text-gray-700 hover:text-black"
                      : "text-white hover:text-[#EBE5C2]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

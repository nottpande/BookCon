import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  var links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "Contact Us",
      link: "/contact-us",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const [Nav, setNav] = useState("hidden");
  
  if (isLoggedIn === false) {
    links.splice(4);
  }
  if (isLoggedIn === true && (role === "buyer" || role === "seller")) {
    links.splice(6, 1);
  }
  if (role === "admin") {
    links.splice(5, 1);
    links.splice(4, 1);
  }

  return (
    <>
      <nav className="relative flex w-full flex-wrap items-center justify-between bg-zinc-800 py-3 text-white lg:py-4" data-twe-navbar-ref>
        <div className="container mx-auto flex flex-wrap items-center justify-between px-3">
          {/* Logo */}
          <div className="flex-shrink-0 items-left">
            <Link to="/" className="flex items-center text-2xl font-semibold">
              <img src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" className="h-8 me-2" /> BookCon
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden flex-grow items-center justify-center lg:flex">
            <form className="flex w-1/2 items-center">
              <input
                type="search"
                placeholder="Search Book"
                className="w-full rounded-l-lg border-0 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                Search
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center lg:flex">
            {links.map((items, i) => (
              <React.Fragment key={i}>
                {items.title === "Profile" || items.title === "Admin Profile" ? (
                  <div className="mx-2 rounded border border-blue-500 px-3 py-1 hover:cursor-pointer hover:bg-white hover:text-zinc-900 transition-all duration-300">
                    <Link to={`${items.link}`} className="text-normal">
                      {items.title}
                    </Link>
                  </div>
                ) : (
                  <div className="mx-2 rounded hover:text-blue-300 transition-all duration-300 hover:cursor-pointer">
                    <Link to={`${items.link}`} className="text-normal">
                      {items.title}
                    </Link>
                  </div>
                )}
              </React.Fragment>
            ))}
            {isLoggedIn === false && (
              <>
                <Link to="/login" className="mx-2 rounded border border-blue-500 px-3 py-1 hover:bg-white hover:text-zinc-900 transition-all duration-300">
                  LogIn
                </Link>
                <Link to="/signup" className="mx-2 rounded bg-blue-500 px-3 py-1 hover:bg-white hover:text-zinc-900 transition-all duration-300">
                  SignUp
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="block border-0 bg-transparent px-2 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0"
              type="button"
              onClick={() => setNav(Nav === "hidden" ? "block" : "hidden")}
            >
              <span className="[&>svg]:w-7 [&>svg]:stroke-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${Nav} lg:hidden bg-zinc-800 text-white px-12`}>
        <div className="flex flex-col items-center">
          {/* Mobile Search Bar */}
          <div className="w-full my-4">
            <form className="flex items-center">
              <input
                type="search"
                placeholder="Search"
                className="w-full px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </form>
          </div>
          {links.map((items, i) => (
            <React.Fragment key={i}>
              {items.title === "Profile" || items.title === "Admin Profile" ? (
                <div className="rounded hover:cursor-pointer border border-blue-500 px-3 py-1 my-3 hover:bg-white hover:text-zinc-900 transition-all duration-300">
                  <Link to={`${items.link}`} className="text-normal" onClick={() => setNav("hidden")}>
                    {items.title}
                  </Link>
                </div>
              ) : (
                <div className="mx-3 hover:text-blue-300 rounded transition-all duration-300 hover:cursor-pointer my-3">
                  <Link to={`${items.link}`} className="text-normal" onClick={() => setNav("hidden")}>
                    {items.title}
                  </Link>
                </div>
              )}
            </React.Fragment>
          ))}
          {isLoggedIn === false && (
            <>
              <Link
                to="/login"
                className="rounded border border-blue-500 px-3 py-1 mx-3 my-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                onClick={() => setNav("hidden")}
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="rounded bg-blue-500 px-3 py-1 my-4 md:my-0 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                onClick={() => setNav("hidden")}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
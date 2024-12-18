import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  // Prevent scrolling when sidebar is visible
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);

  // Reusable NavLinkItem Component
  const NavLinkItem = ({ to, label, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `py-2 pl-6 border ${
          isActive ? "font-bold text-black" : "text-gray-600"
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-black font-bold" : "text-gray-700"
            }`
          }
        >
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-black font-bold" : "text-gray-700"
            }`
          }
        >
          <p>Collection</p>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-black font-bold" : "text-gray-700"
            }`
          }
        >
          <p>About</p>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "text-black font-bold" : "text-gray-700"
            }`
          }
        >
          <p>Contact</p>
        </NavLink>
      </ul>

      {/* Right-side icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
        />

        {/* Profile */}
        <Link to="/login">
          <img src={assets.profile_icon} alt="Profile" className="w-5 cursor-pointer" />
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart" className="w-5 min-w-5" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Hamburger Menu for Small Screens */}
        <button
          aria-label="Open menu"
          onClick={() => setVisible(!visible)}
          className="sm:hidden"
        >
          <img src={assets.menu_icon} alt="Menu" className="w-5" />
        </button>
      </div>

      {/* Sidebar menu for small screens */}
      {visible && (
        <div
          className={`absolute top-0 right-0 bottom-0 w-full bg-white ease-in duration-300`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img src={assets.dropdown_icon} alt="Back" className="h-4 rotate-180" />
              <p className="font-semibold">Back</p>
            </div>

            {/* Sidebar Navigation */}
            <NavLinkItem
              to="/"
              label="Home"
              onClick={() => setVisible(false)}
            />
            <NavLinkItem
              to="/collection"
              label="Collection"
              onClick={() => setVisible(false)}
            />
            <NavLinkItem
              to="/about"
              label="About"
              onClick={() => setVisible(false)}
            />
            <NavLinkItem
              to="/contact"
              label="Contact"
              onClick={() => setVisible(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

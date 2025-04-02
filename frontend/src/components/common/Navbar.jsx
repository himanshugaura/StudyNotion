import React, { useEffect, useState, useRef } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import NavbarLinks from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import Button from '../core/HomePage/Button';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showCatalogDropdown, setShowCatalogDropdown] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Could not fetch the category link");
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  // Function to check if a route is active (handles undefined paths)
  const matchRoute = (route) => {
    return route ? matchPath({ path: route }, location.pathname) : false;
  };

  const catalogRef = useRef(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setShowCatalogDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center border-b border-richblack-700 h-14 bg-richblack-900 py-10">
      <div className="flex w-11/12 max-w-[1200px] items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex gap-x-6 text-richblack-5">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div
                    ref={catalogRef}
                    onClick={() => setShowCatalogDropdown(!showCatalogDropdown)} // Toggle dropdown on click
                    className="cursor-pointer"
                  >
                    <p>{link.title}</p>

                    {/* Dropdown Menu */}
                    {showCatalogDropdown && (
                      <div className="absolute left-0 w-48 mt-2 bg-white text-black rounded-lg shadow-lg">
                        <ul className="py-2">
                          {subLinks.map((subLink, index) => (
                            <li key={index}>
                              <Link
                                to={`/catalog/${subLink.slug}`} // Assuming `slug` is a valid path for each category
                                className="block px-4 py-2 hover:bg-gray-200"
                              >
                                {subLink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-5"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-x-4 items-center text-richblack-5">
          {
            user && user?.accountType !== "Instructor" && (
              <Link to='/dashboard/cart' className='relative'>
                <FaShoppingCart />
                {
                  totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full text-xs px-2">{totalItems}</span>
                  )
                }
              </Link>
            )
          }

          {/* This section for buttons should only be shown on mobile */}
          {token === null && !isOpen && (
            <div className='hidden md:flex gap-5'>
              <Button active={false} linkto='/login'>
                Log In
              </Button>
              <Button active={false} linkto='/signup'>
                Sign Up
              </Button>
            </div>
          )}

          {
            token !== null && <ProfileDropDown />
          }
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-richblack-5" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-richblack-900 text-richblack-5 md:hidden z-10 py-4 border-b-2 border-richblack-5">
          <ul className="flex flex-col items-center gap-y-4 z-100">
            {NavbarLinks.map((link, index) => (
              link?.title === "Catalog" ? (
                <li key={index} className="relative">
                  <div
                    ref={catalogRef} // Use the same ref for mobile dropdown
                    className="cursor-pointer"
                    onClick={() => setShowCatalogDropdown(!showCatalogDropdown)} // Toggle dropdown on click
                  >
                    <p>{link.title}</p>

                    {/* Mobile Dropdown */}
                    {showCatalogDropdown && (
                      <div className="absolute left-0 w-48 mt-2 bg-white text-black rounded-lg shadow-lg">
                        <ul className="py-2">
                          {subLinks.map((subLink, index) => (
                            <li key={index}>
                              <Link
                                to={`/catalog/${subLink.slug}`} // Assuming `slug` is a valid path for each category
                                className="block px-4 py-2 hover:bg-gray-200"
                              >
                                {subLink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)} // Close menu on link click
                    className={`block px-4 py-2 hover:bg-richblack-700 w-full text-center ${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-5"}`}
                  >
                    {link.title}
                  </Link>
                </li>
              )
            ))}

            {/* Add Log In and Sign Up buttons to the mobile menu */}
            {token === null && (
              <div className='flex flex-col gap-5'>
                <Button active={false} linkto='/login'>
                  Log In
                </Button>
                <Button active={false} linkto='/signup'>
                  Sign Up
                </Button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
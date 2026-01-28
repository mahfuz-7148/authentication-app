import React, {useState} from 'react'
import {Link} from 'react-router';
import {FaBars, FaSignInAlt, FaSignOutAlt, FaTimes, FaUser} from 'react-icons/fa';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-xl font-bold hover:text-blue-400 transition-colors"
          >
            MERN Auth
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/*{userInfo ? (*/}
            {/*  <div className="relative">*/}
            {/*    <button*/}
            {/*      onClick={() => setDropdownOpen(!dropdownOpen)}*/}
            {/*      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"*/}
            {/*    >*/}
            {/*      <FaUser className="text-sm" />*/}
            {/*      <span>{userInfo.name}</span>*/}
            {/*      <svg*/}
            {/*        className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}*/}
            {/*        fill="none"*/}
            {/*        stroke="currentColor"*/}
            {/*        viewBox="0 0 24 24"*/}
            {/*      >*/}
            {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />*/}
            {/*      </svg>*/}
            {/*    </button>*/}

            {/*    {dropdownOpen && (*/}
            {/*      <>*/}
            {/*          <div*/}
            {/*            className="fixed inset-0 z-10"*/}
            {/*            onClick={() => setDropdownOpen(false)}*/}
            {/*          />*/}
            {/*        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-20 py-2">*/}
            {/*          <Link*/}
            {/*            to="/profile"*/}
            {/*            onClick={() => setDropdownOpen(false)}*/}
            {/*            className="block px-4 py-2 hover:bg-gray-700 transition-colors"*/}
            {/*          >*/}
            {/*            Profile*/}
            {/*          </Link>*/}
            {/*          <button*/}
            {/*            onClick={logoutHandler}*/}
            {/*            className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"*/}
            {/*          >*/}
            {/*            Logout*/}
            {/*          </button>*/}
            {/*        </div>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*  <>*/}
            {/*    <Link*/}
            {/*      to="/login"*/}
            {/*      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"*/}
            {/*    >*/}
            {/*      <FaSignInAlt />*/}
            {/*      <span>Sign In</span>*/}
            {/*    </Link>*/}
            {/*    <Link*/}
            {/*      to="/register"*/}
            {/*      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"*/}
            {/*    >*/}
            {/*      <FaSignOutAlt />*/}
            {/*      <span>Sign Up</span>*/}
            {/*    </Link>*/}
            {/*  </>*/}
            {/*)}*/}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {userInfo ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <FaUser className="inline mr-2" />
                  Profile ({userInfo.name})
                </Link>
                <button
                  onClick={() => {
                    logoutHandler();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <FaSignInAlt className="inline mr-2" />
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaSignOutAlt className="inline mr-2" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

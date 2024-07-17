import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { HeaderExplore } from "../component/header-explore";
import SearchToggle from "../component/SearchToggle";
import MobileMenu from "../component/MobileMenu";
import logo from '../../../assets/img/logo/kodr2.png';
import Menu from "@/components/pages/home/Menu";

// Custom hook for window size
function useWindowSize() {
  const [screenSize, setScreenSize] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setScreenSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}

export default function Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [loginDrop, setLoginDrop] = useState(false);
  const screenSize = useWindowSize();
  const loginRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setLoginOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginRef]);

  return (
    <header className="header -type-1">
      <div className="header__container">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left">
              <div className="header__logo">
                <Link to="/">
                  <img src={logo} alt="logo" style={{ height: "30px" }}/>
                </Link>
              </div>
              <HeaderExplore
                allClasses="header__explore text-green-1 ml-60 xl:ml-30 xl:d-none"
              />
            </div>
          </div>

          <Menu allClasses={"menu__nav text-white -is-active"} />
          <MobileMenu
            setActiveMobileMenu={setActiveMobileMenu}
            activeMobileMenu={activeMobileMenu}
          />

          <div className="col-auto row d-flex align-items-center">
            <div className="col-auto">
              <div className="header-right d-flex items-center">
                <div className="header-right__icons text-white d-flex items-center">
                  <SearchToggle />
                  <div className="d-none xl:d-block ml-20">
                    <button
                      onClick={() => setActiveMobileMenu(true)}
                      className="text-white items-center"
                      data-el-toggle=".js-mobile-menu-toggle"
                    >
                      <i className="text-11 icon icon-mobile-menu"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-auto">
              <div>
                <Link to="#" onClick={() => setLoginDrop((pre) => !pre)} className="text-14 text-green-1">  
                  Login
                  <i className="text-9 icon-chevron-down ml-10"></i>
                </Link>
                <div
                  className={`explore-content py-25 rounded-8 bg-white toggle-element js-explore-toggle ${
                    loginDrop ? "-is-el-visible" : ""
                  }`} 
                  style={{ minWidth: "-webkit-fill-available" }}
                >
                  <div className="explore__item">
                    <Link
                      to="/admin/login"
                      className="d-flex items-center justify-between text-dark-1"
                    >
                      Admin
                    </Link>
                  </div>
                  <div className="explore__item">
                    <Link
                      to="/trainer/login"
                      className="d-flex items-center justify-between text-dark-1"
                    >
                      Trainer
                    </Link>
                  </div>
                  <div className="explore__item">
                    <Link
                      to="/student/login"
                      className="d-flex items-center justify-between text-dark-1"
                    >
                      Student
                    </Link>
                  </div>
                </div> */}
                {/* <div className="dropdown__item -dark-bg-dark-2 -dark-border-white-10">
                  <div className="text-14 y-gap-15" >
                    <div> 
                      <Link to="/admin/login" className="d-block text-dark-1">
                        Admin
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/trainer/login"
                        className="d-block text-dark-1"
                      >
                        Trainer
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/student/login"
                        className="d-block text-dark-1"
                      >
                        Student
                      </Link>
                    </div>
                  </div>
                </div> */}
              {/* </div>
            </div> */}
            <div className={`${ screenSize.screenWidth > 425 ? "col-auto" : "d-none col-6" }`}>
              <Link
                to="/login"
                className="button -sm -green-1 text-dark-1"
              >
                Login
              </Link>
            </div>
            <div className={`${ screenSize.screenWidth > 425 ? "col-auto" : "d-none col-6" }`}>
              <Link
                to="/signup"
                className="button -sm -green-1 text-dark-1"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

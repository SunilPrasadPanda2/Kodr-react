import React, { useState } from "react";
// import MobileMenu from "../component/MobileMenu";
import { Link } from "react-router-dom";

export default function HeaderAuth() {
  // const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  return (
    <header className="header -base js-header">
      <div className="header__container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left">
              <div className="header__logo ">
                <Link data-barba to="/">
                  <img src="/assets/img/logo/kodr2.png" alt="logo" style={{ height: "30px" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

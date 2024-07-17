import { sidebarItems } from "@/data/mydata/admin/dashBoardSidebar";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "@/pages/CommonPages/logout/Logout";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="sidebar -dashboard">
      {sidebarItems.map((elm, i) => (
        <div
          key={i}
          className={`sidebar__item ${
            pathname === elm.href ? "-is-active" : ""
          }`}
        >
          {elm.href === "/" ? (
            <Logout iconClass={elm.iconClass} text={elm.text} />
          ) : (
            <Link
              to={elm.href}
              className="d-flex items-center text-17 lh-1 fw-500"
            >
              <i className={`${elm.iconClass} mr-15`}></i>
              {elm.text}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

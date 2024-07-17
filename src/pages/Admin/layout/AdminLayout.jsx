import Preloader from "@/components/common/Preloader";
import Sidebar from "./components/Sidebar";
import HeaderDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Kodr-Admin",
  description: "For the coder in you.",
};

export default function AdminLayout() {
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <Suspense>{<Outlet />}</Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

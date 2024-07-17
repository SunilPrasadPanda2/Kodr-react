import Preloader from "@/components/common/Preloader";
import Sidebar from "./components/Sidebar";
import HeaderDashboard from "./components/TrainerDashboard";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Cashboard || Educrat - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function TrainerLayout() {
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
            <Suspense>{ <Outlet/> }</Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

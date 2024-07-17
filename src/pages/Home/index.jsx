import Header from "@/components/layout/headers/Header";
import HomeHero from "@/components/homes/heros/HomeHero";
import Brands from "@/components/common/Brands";
import Categories from "@/components/homes/categories/Categories";
import Courses from "@/components/homes/courses/Courses";
import TestimonialsOne from "@/components/common/TestimonialsOne";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import WhyCourse from "@/components/homes/WhyCourse";
import GetApp from "@/components/homes/getApp/GetApp";
import Join from "@/components/homes/join/Join";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import { Outlet } from "react-router-dom";

const metadata = {
  title: "Kodr",
  description: "For the coder in you.",
};

export default function HomePage() {
  return (
    <>
     
      <Preloader />
      <MetaComponent meta={metadata} />
      <Outlet />
      <Header />
      
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <HomeHero />
        <Brands />
        <Categories />
        <Courses />
        <TestimonialsOne />
        <FeaturesOne />
        <WhyCourse />
        <GetApp />
        <Join />
        <FooterOne />
      </div>
    </>
  );
}

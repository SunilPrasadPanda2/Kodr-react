import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PageLinks from "@/components/pages/home/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsSix from "@/components/pages/home/courses/CourseDetailsSix";
import CourseSlider from "@/components/pages/home/courses/CourseSlider";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import MetaComponent from "@/components/common/MetaComponent";

import { coursesData } from "@/data/courses"; // Ensure you have this data or fetch from API

const metadata = {
  title: "Kodr",
  description: "",
};

export default function CoursePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      // Simulate a fetch delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const foundCourse = coursesData.find((course) => course.id.toString() === id);
      setCourse(foundCourse);
      setIsLoading(false); // Stop loading
    };

    const handleScrollToTop = () => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 1000); // Delay of 1000 milliseconds (1 second)
    };

    handleScrollToTop();
    fetchCourse();
  }, [id]);

  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      {isLoading && <Preloader />}
      <Header />
      <div className="content-wrapper js-content-wrapper">
        <PageLinks dark={true} />
        {course ? (
          <CourseDetailsSix id={id} />
        ) : (
          <p className="text-center">Course not found</p> // Fallback content
        )}
        <CourseSlider />
        {/* <FooterOne /> */}
      </div>
    </div>
  );
}

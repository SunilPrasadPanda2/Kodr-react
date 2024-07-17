import React, { useState } from "react";
import { Link } from "react-router-dom";
export const HeaderExplore = ({ allClasses }) => {
  const [exploreActive, setExploreActive] = useState(false);

  // Function to toggle the explore menu's visibility
  const toggleExplore = () => {
    setExploreActive(prev => !prev);
  };

  // Function to close the explore menu
  const closeExplore = () => {
    setExploreActive(false);
  };
  return (
    <>
      <div className={`${allClasses ? allClasses : ""}`}>
        <Link
          to="#"
          onClick={() => setExploreActive((pre) => !pre)}
          className="d-flex items-center"
          data-el-toggle=".js-explore-toggle"
        >
          <i className="icon icon-explore mr-15"></i>
          Courses
        </Link>

        <div
          className={`explore-content py-25 rounded-8 bg-white toggle-element js-explore-toggle ${
            exploreActive ? "-is-el-visible" : ""
          }`}
        >
          <div className="explore__item" onClick={ closeExplore }>
            <Link
              to="#"
              className="d-flex items-center justify-between text-dark-1"
            >
              AI and ML<div className="icon-chevron-right text-11"></div>
            </Link>
            <div className="explore__subnav rounded-8 fit-content">
              <Link className="text-dark-1" to={`/course/1`}>
                Introduction to Machine Learning
              </Link>
              <Link className="text-dark-1" to={`/course/2`}>
                Deep Learning
              </Link>
              <Link className="text-dark-1" to={`/course/3`}>
                Natural Language Processing (NLP)
              </Link>
              <Link className="text-dark-1" to={`/course/4`}>
                Computer Vision
              </Link>
            </div>
          </div>

          <div className="explore__item" onClick={ closeExplore }>
            <Link
              to="#"
              className="d-flex items-center justify-between text-dark-1"
            >
              Data Science<div className="icon-chevron-right text-11"></div>
            </Link>
            <div className="explore__subnav rounded-8  fit-content">
              <Link className="text-dark-1" to={`/course/5`}>
                Data Analysis and Visualization
              </Link>
              <Link className="text-dark-1" to={`/course/6`}>
                Statistical Modeling
              </Link>
              <Link className="text-dark-1" to={`/course/7`}>
                Big Data Technologies
              </Link>
              <Link className="text-dark-1" to={`/course/8`}>
                Data Engineering
              </Link>
            </div>
          </div>

          <div className="explore__item" onClick={ closeExplore }>
            <Link
              to="#"
              className="d-flex items-center justify-between text-dark-1"
            >
              Flutter<div className="icon-chevron-right text-11"></div>
            </Link>
            <div className="explore__subnav rounded-8 fit-content">
              <Link className="text-dark-1" to={`/course/9`}>
                Flutter Basics
              </Link>
              <Link className="text-dark-1" to={`/course/10`}>
                Advanced Flutter Widgets
              </Link>
              <Link className="text-dark-1" to={`/course/11`}>
                State Management in Flutter
              </Link>
              <Link className="text-dark-1" to={`/course/12`}>
                Building Full-Stack Applications with Flutter
              </Link>
            </div>
          </div>

          <div className="explore__item" onClick={ closeExplore }>
            <Link
              to="#"
              className="d-flex items-center justify-between text-dark-1"
            >
              Kotlin<div className="icon-chevron-right text-11"></div>
            </Link>
            <div className="explore__subnav rounded-8 fit-content">
              <Link className="text-dark-1" to={`/course/13`}>
                Kotlin for Beginners
              </Link>
              <Link className="text-dark-1" to={`/course/14`}>
                Kotlin for Android Development
              </Link>
              <Link className="text-dark-1" to={`/course/15`}>
                Advanced Kotlin Techniques
              </Link>
              <Link className="text-dark-1" to={`/course/16`}>
                Kotlin Multiplatform
              </Link>
            </div>
          </div>

          <div className="explore__item" onClick={ closeExplore }>
            <Link
              to="#"
              className="d-flex items-center justify-between text-dark-1"
            >
              MERN Stack<div className="icon-chevron-right text-11"></div>
            </Link>
            <div className="explore__subnav rounded-8 fit-content">
              <Link className="text-dark-1" to={`/course/17`}>
                Intro to MERN Stack
              </Link>
              <Link className="text-dark-1" to={`/course/18`}>
                React
              </Link>
              <Link className="text-dark-1" to={`/course/19`}>
                Node.js and Express
              </Link>
              <Link className="text-dark-1" to={`/course/20`}>
                MongoDB
              </Link>
              <Link className="text-dark-1" to={`/course/21`}>
                Deploying MERN Applications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

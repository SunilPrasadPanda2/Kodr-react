import React from "react";
import { Link } from "react-router-dom";
export default function Join() {
  return (
    <section className="layout-pt-md layout-pb-md bg-purple-1">
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="col-xl-4 col-lg-5">
            <h2 className="text-30 lh-15 text-white">
              Join more than
              <span className="text-green-1"> 5000 <br /> Kodrs</span> worldwide
            </h2>
          </div>

          <div className="col-auto">
            <Link to="#" className="button -md -green-1 text-dark-1">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

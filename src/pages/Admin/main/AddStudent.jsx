import React from "react";
import Footer from "../layout/components/Footer";
import Media from "./components/createcourse/Media";
import Curriculum from "./components/createcourse/Curriculum";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create New Student</h1>
            <div className="mt-10">
              More the merrier
            </div>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
              </div>

              <div className="py-30 px-30">
              <form
                className="contact-form respondForm__form row y-gap-20"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username *
                  </label>
                  <input required type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input required type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Phone Number *
                  </label>
                  <input required type="text" name="phone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="col-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input required type="text" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="col-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input required type="text" name="confirm-password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div className="col-auto row y-gap-20 justify-between pt-15 w-1/1">
                  <div className="col-auto">
                      <button className="button -md -outline-purple-1 text-purple-1" onClick={ (e) => navigation(-1) }>
                      Back
                      </button>
                  </div>

                  <div className="col-auto">
                      <button className="button -md -purple-1 text-white">
                      Submit
                      </button>
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

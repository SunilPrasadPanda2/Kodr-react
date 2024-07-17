import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/components/Footer";
import axios from "axios";

export default function Createbanner() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("offer", offer);
    formData.append("file", file);

    console.log(desc, offer, file);
    const url = import.meta.env.VITE_BASE_URL + "/admin/add-banner";
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 201) {
        console.log("created");
        navigate("/admin/banners");
      } else {
        console.log("not created");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Add Trainer</h1>
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
                  onSubmit={handleSubmit}
                  className="contact-form row y-gap-30"
                  action="#"
                >
                  <div className="col-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Name*
                    </label>

                    <input
                      required
                      type="text"
                      placeholder="Enter banner Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Offer*
                    </label>

                    <input
                      required
                      type="text"
                      placeholder="Enter offer percentage"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Description*
                    </label>

                    <textarea
                      required
                      placeholder="Enter banner Description"
                      rows="3"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="col-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Image*
                    </label>

                    <input
                      required
                      type="file"
                      placeholder="Image"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div className="col-auto row y-gap-20 justify-between pt-15 w-1/1">
                    <div className="col-auto">
                      <button
                        className="button -md -outline-purple-1 text-purple-1"
                        onClick={(e) => navigate(-1)}
                      >
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/components/Footer";
import img from "../../../assets/img/dashboard/edit/1.png";
import { addBanner } from "@/apis/admin/BannersApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CreateBanner() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(img);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (offer) {
      formData.append("offer", offer);
    }
    formData.append("bannerImage", bannerImage);

    try {
      const response = await addBanner(formData);
      console.log("Banner responce", response);
      if (response.statusCode === 201) {
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "Banner added successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/admin/banners");
      } else if (response.status === 409) {
        MySwal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred!",
      });
      console.warn(err);
    }
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Add Banner</h1>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
              </div>
              <div className="row y-gap-20 x-gap-20 items-center ms-3 mt-2">
                <label
                  className="col-auto"
                  htmlFor="imageUpload1"
                  style={
                    previewImage
                      ? {}
                      : { backgroundColor: "#f2f3f4", width: 100, height: 100 }
                  }
                >
                  {previewImage && (
                    <img
                      className="size-100"
                      src={previewImage}
                      alt={previewImage ? "image" : ""}
                    />
                  )}
                </label>

                <div className="col-auto">
                  <div className="text-16 fw-500 text-dark-1">
                    Banner Image <span className="text-danger">*</span>
                  </div>
                  <div className="text-14 lh-1 mt-10">
                    PNG or JPG no bigger than 800px wide and tall.
                  </div>

                  <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
                    <div>
                      <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                        <label
                          style={{ cursor: "pointer" }}
                          htmlFor="imageUpload1"
                          className="icon-cloud text-16"
                        ></label>
                        <input
                          required
                          id="imageUpload1"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          document.getElementById("imageUpload1").value = "";
                          setPreviewImage(img);
                          setBannerImage(null);
                        }}
                        className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
                      >
                        <div className="icon-bin text-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      Offer
                    </label>
                    <input
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
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
                      <button
                        className="button -md -purple-1 text-white"
                        type="submit"
                      >
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

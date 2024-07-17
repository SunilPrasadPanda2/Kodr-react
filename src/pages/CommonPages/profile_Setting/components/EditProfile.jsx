import React, { useState, useEffect } from "react";
import img from "../../../../assets/img/dashboard/edit/1.png";
import { userProfile, updateProfile } from "@/apis/auth";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function EditProfile({ activeTab }) {
  const MySwal = withReactContent(Swal);
  const [previewImage, setPreviewImage] = useState(img);
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    bloodGroup: "",
    birthDay: null,
    address1: "",
    address2: "",
    state: "",
    country: "",
    personalInfo: "",
    profilePicture: null,
  });
  const [isUpdating, setIsUpdating] = useState(false); // State for loading indicator

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await userProfile();
      if (response && response.data && response.data.user) {
        setProfileData({
          ...response.data.user,
          birthDay: response.data.user.birthDay
            ? new Date(response.data.user.birthDay)
            : null,
        });
        setPreviewImage(response.data.user.profilePicture || img);
      }
    };
    fetchProfileData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileData({ ...profileData, profilePicture: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const keysToInclude = [
      "name",
      "phone",
      "email",
      "gender",
      "bloodGroup",
      "birthDay",
      "address1",
      "address2",
      "state",
      "country",
      "personalInfo",
    ];

    keysToInclude.forEach((key) => {
      if (profileData[key] !== null && profileData[key] !== undefined) {
        if (key === "birthDay") {
          formData.append(key, profileData[key].toISOString());
        } else {
          formData.append(key, profileData[key]);
        }
      }
    });
    // Special handling for profilePicture
    if (profileData.profilePicture instanceof File) {
      formData.append("profilePicture", profileData.profilePicture);
    }

    try {
      setIsUpdating(true); // Set loading state to true
      const response = await updateProfile(formData);
      console.log("profile update response ", response);
      if (response.success) {
        MySwal.fire({
          title: "Success!",
          text: "Profile updated successfully.",
          icon: "success",
          timer: 1500, // Automatically close after 1.5 seconds
          showConfirmButton: false, // No confirm button
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      MySwal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsUpdating(false); // Reset loading state
    }
  };

  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""}`}
    >
      <div className="row y-gap-20 x-gap-20 items-center">
        <label
          className="col-auto"
          htmlFor="imageUpload"
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
            Your Image <span className="text-danger">*</span>
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
                  setPreviewImage("");
                }}
                className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
              >
                <div className="icon-bin text-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Name <span className="text-danger">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Phone <span className="text-danger">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Phone"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
            />
          </div>

          <div className="col-md-3">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Birthday <span className="text-danger">*</span>
            </label>
            <br />
            <DatePicker
              selected={profileData.birthDay}
              onChange={(date) =>
                setProfileData({ ...profileData, birthDay: date })
              }
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select your birthday"
              required
            />
          </div>
          <div className="col-md-5">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Gender <span className="text-danger">*</span>
            </label>
            <select
              required
              value={profileData.gender}
              onChange={(e) =>
                setProfileData({ ...profileData, gender: e.target.value })
              }
              className="form-control"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Blood Group <span className="text-danger">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Blood Group"
              value={profileData.bloodGroup}
              onChange={(e) =>
                setProfileData({ ...profileData, bloodGroup: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Address Line 1 <span className="text-danger">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Address Line 1"
              value={profileData.address1}
              onChange={(e) =>
                setProfileData({ ...profileData, address1: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Address Line 2 <span className="text-danger">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Address Line 2"
              value={profileData.address2}
              onChange={(e) =>
                setProfileData({ ...profileData, address2: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              State <span className="text-danger">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="State"
              value={profileData.state}
              onChange={(e) =>
                setProfileData({ ...profileData, state: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Country <span className="text-danger">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Country"
              value={profileData.country}
              onChange={(e) =>
                setProfileData({ ...profileData, country: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Personal info <span className="text-danger">*</span>
            </label>
            <textarea
              required
              placeholder="Text..."
              rows="2"
              value={profileData.personalInfo}
              onChange={(e) =>
                setProfileData({ ...profileData, personalInfo: e.target.value })
              }
            ></textarea>
          </div>

          <div className="col-12">
            <button
              className="button -md -purple-1 text-white"
              type="submit"
              disabled={isUpdating} // Disable button while updating
            >
              {isUpdating ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

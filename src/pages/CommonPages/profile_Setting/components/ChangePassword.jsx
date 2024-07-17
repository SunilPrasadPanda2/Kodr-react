import React, { useState } from "react";
import { changePassword } from "@/apis/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePassword({ activeTab }) {
  const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVisibilityToggle = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      MySwal.fire({
        title: "Error!",
        text: "New password and confirm new password do not match.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true); // Set loading state to true when form is submitted

    try {
      const response = await changePassword(formData);
      if (response.success) {
        MySwal.fire({
          title: "Success!",
          text: "Password changed successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        // Reset form data
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else if (response.statusCode === 403) {
        MySwal.fire({
          title: "Error!",
          text: response.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div
      className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""}`}
    >
      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Current password
          </label>
          <div
            className="input-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              required
              type={passwordVisibility.currentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <span
              className="input-group-text ps-3"
              onClick={() => handleVisibilityToggle("currentPassword")}
              style={{ cursor: "pointer", fontSize: "25px" }}
            >
              {passwordVisibility.currentPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            New password
          </label>
          <div
            className="input-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              required
              type={passwordVisibility.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <span
              className="input-group-text ps-3"
              onClick={() => handleVisibilityToggle("newPassword")}
              style={{ cursor: "pointer", fontSize: "25px" }}
            >
              {passwordVisibility.newPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Confirm New Password
          </label>
          <div
            className="input-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              required
              type={passwordVisibility.confirmNewPassword ? "text" : "password"}
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
            <span
              className="input-group-text ps-3"
              onClick={() => handleVisibilityToggle("confirmNewPassword")}
              style={{ cursor: "pointer", fontSize: "25px" }}
            >
              {passwordVisibility.confirmNewPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>
        </div>

        <div className="col-12">
          <button
            className="button -md -purple-1 text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Changing Password...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

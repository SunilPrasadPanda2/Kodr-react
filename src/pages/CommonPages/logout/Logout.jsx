import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/apis/auth";
import { resetAuth } from "@/store/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Logout({ iconClass, text }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const handleLogout = async () => {
    try {
      // Show the confirmation alert first
      const result = await MySwal.fire({
        title: "Logout Confirmation",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
  
      // If the user confirms, proceed with the logout API call
      if (result.isConfirmed) {
        const response = await logout();
        console.log("logout response", response);
  
        if (response.statusCode === 200) {
          navigate("/");
          dispatch(resetAuth());
        } else {
          // Handle the case where the API call did not succeed
          console.log("Logout failed. Please try again.");
        }
      }
    } catch (err) {
      // Handle any errors that occurred during the process
      console.log("An error occurred during logout.", err);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="d-flex items-center text-17 lh-1 fw-500"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <i className={`${iconClass} mr-15`}></i>
        {text}
      </button>
    </>
  );
}

export default Logout;

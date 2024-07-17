import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/apis/auth";
import { resetAuth, accessToken, selectUserId } from "@/store/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Logout({ iconClass, text }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _id = useSelector(selectUserId);
  const token = useSelector(accessToken);
  const MySwal = withReactContent(Swal);

  const handleLogout = async () => {
    try {
      const response = await logout(_id);
      console.log("logout response", response);
      if (response.statusCode === 200) {
        MySwal.fire({
          title: "Logout Confirmation",
          text: "Are you sure you want to logout?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
            dispatch(resetAuth());
          }
        });
      }
    } catch (err) {
      console.log("Logout failed. Please try again.", err);
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

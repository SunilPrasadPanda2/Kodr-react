import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { login } from "@/apis/auth";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await login(data);
      console.log("login response",response);
      if (response.statusCode === 200) {
        dispatch(
          setAuth({
            _id: response.data.user._id,
            gender: response.data.user.gender,
            phone: response.data.user.phone,
            name: response.data.user.name,
            userType: response.data.user.userType,
            isAuthenticated: true,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );

        // Show a welcome message using SweetAlert
        MySwal.fire({
          title: "Welcome!",
          text: "You have logged in successfully.",
          icon: "success",
          timer: 1500, // Automatically close after 2 seconds
          showConfirmButton: false, // No confirm button
        });

        const userType = response.data.user.userType;

        if (userType === "Admin") {
          navigate("/admin/dashboard");
        } else if (userType === "Trainer") {
          navigate("/trainer/dashboard");
        } else if (userType === "Student") {
          navigate("/student/dashboard");
        }
      } else if (response.status === 401) {
        MySwal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (response.status === 400) {
        MySwal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
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
    }
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Login</h3>
              <p className="mt-10">
                Don't have an account yet?
                <Link to="/student/signup" className="text-purple-1">
                  Sign up for free
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email
                  </label>
                  <input
                    required
                    type="text"
                    name="email"
                    placeholder="Email"
                    onInput={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    onInput={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="col-6">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Login
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="reset"
                    name="back"
                    id="back"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

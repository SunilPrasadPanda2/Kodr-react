import React, { useState, useEffect } from "react";
import Footer from "../layout/components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(url + "/admin/all-students");
        if (response.status == 200) {
          setStudents(response.data.data);
        } else {
          console.log("did not succeed with the request");
        }
      } catch (err) {
        console.warn(err);
        console.log("Database connection lost");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard__main">
      <div
        className="dashboard__content bg-light-4"
        style={{ minHeight: "calc(100vh - 210px)" }}
      >
        <div className="row pb-20 mb-10">
          <div className="col-6">
            <h1 className="text-30 lh-12 fw-700">Students</h1>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div className="eventCard__button">
              <Link
                to="/admin/add-student"
                className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
              >
                Add Student
              </Link>
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="tabs -active-purple-2 js-tabs">
                <div className="tabs__controls d-flex items-center pt-20 px-30 border-bottom-light ">
                  <button
                    className="text-light-1 lh-12 tabs__button"
                    type="button"
                  >
                    All Students
                  </button>
                </div>

                <div className="tabs__content py-30 px-30 js-tabs-content">
                  <div className="table-calendar">
                    <table className="w-1/1 table table-striped">
                      <thead>
                        <tr>
                          <th>Sl.no</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Activated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          // students.map( (student, index) => (
                          //   <tr key={ index }>
                          //     <td>{ index }</td>
                          //     <td>{ student.name }</td>
                          //     <td>{ student.email }</td>
                          //     <td>{ student.phone }</td>
                          //     <td>{ "tring" }</td>
                          //   </tr>
                          // ))
                        }
                        <tr>
                          <td>1</td>
                          <td>abc</td>
                          <td>abc@gmail.com</td>
                          <td>0123456789</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>xyz</td>
                          <td>xyz@gmail.com</td>
                          <td>0123456789</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Footer from "../layout/components/Footer";
import { Link } from "react-router-dom";
import { students } from "@/apis/admin/StudentsApi";
import { accessToken } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { viewUser } from "@/apis/admin/CommonApis";

export default function Student() {
  const token = useSelector(accessToken);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await students();
        if (response.statusCode === 200) {
          setStudentData(response.data.trainers);
        } else {
          log;
          return <div>Problem while loading students</div>;
        }
      } catch (error) {
        console.error(
          error.message || "An error occurred while fetching students"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
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
                          <th>Operations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentData.map((student, index) => (
                          <tr key={student._id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>
                              <Link to={`${student._id}`}>
                                <FontAwesomeIcon
                                  icon={faUserPen}
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "15px",
                                    marginLeft: "15px",
                                  }}
                                />
                              </Link>
                              <Link to={`${student._id}`}>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{ fontSize: "20px" }}
                                />
                              </Link>
                            </td>
                          </tr>
                        ))}
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

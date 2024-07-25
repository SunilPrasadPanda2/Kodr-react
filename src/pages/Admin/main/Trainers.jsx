import React, { useEffect, useState } from "react";
import Footer from "../layout/components/Footer";
import { Link } from "react-router-dom";
import { trainers } from "@/apis/admin/TrainersApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { viewUser } from "@/apis/admin/CommonApis";

export default function Trainer() {
  const [trainerList, setTrainerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await trainers();
        if (response.statusCode === 200) {
          setTrainerList(response.data.trainers);
        } else {
          return <div>Problem while loading trainers</div>;
        }
      } catch (error) {
        console.error(
          error.message || "An error occurred while fetching trainers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
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
            <h1 className="text-30 lh-12 fw-700">Trainers</h1>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div className="eventCard__button">
              <Link
                to="/admin/add-trainer"
                className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
              >
                Add Trainer
              </Link>
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="tabs -active-purple-2 js-tabs">
                <div className="tabs__controls d-flex items-center pt-20 px-30 border-bottom-light">
                  <button
                    className="text-light-1 lh-12 tabs__button"
                    type="button"
                  >
                    All Trainers
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
                        {trainerList.map((trainer, index) => (
                          <tr key={trainer._id}>
                            <td>{index + 1}</td>
                            <td>{trainer.name}</td>
                            <td>{trainer.email}</td>
                            <td>{trainer.phone}</td>
                            <td>
                              <Link to={`${trainer._id}`}>
                                <FontAwesomeIcon
                                  icon={faUserPen}
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "15px",
                                    marginLeft: "15px",
                                  }}
                                />
                              </Link>
                              <Link to={`${trainer._id}`}>
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

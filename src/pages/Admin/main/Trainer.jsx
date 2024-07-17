import React, { useEffect, useState } from "react";
import Footer from "../layout/components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Trainer() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_BASE_URL;
        console.log(url);
        const response = await axios.get(url + "/admin/all-trainers");
        if (response.status == 200) {
          setTrainers(response.data.data);
        }
      } catch (err) {
        console.log("problemooooo");
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
                <div className="tabs__controls d-flex items-center pt-20 px-30 border-bottom-light ">
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
                          <th>Profile Image</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Activated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          // trainers.map((trainer, index) => (
                          //   <tr key={index}>
                          //     <td>{ index+1 }</td>
                          //     <td>{ trainer.profileImage }</td>
                          //     <td>{ trainer.name }</td>
                          //     <td>{ trainer.email }</td>
                          //     <td>{ trainer.phone }</td>
                          //     <td></td>
                          //   </tr>
                          // ))
                        }
                        <tr>
                          <td>1</td>
                          <td>Trainer-1</td>
                          <td>abc</td>
                          <td>abc@gmail.com</td>
                          <td>0123456789</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Trainer-2</td>
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

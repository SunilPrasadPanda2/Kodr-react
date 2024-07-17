import React, { useEffect, useState } from "react";
import Footer from "../layout/components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Categoty() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = import.meta.env.VITE_BASE_URL;
        console.log(url);
        const response = await axios.get(url + "/admin/all-categories");
        if (response.status == 200) {
          setCategories(response.data.data);
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
            <h1 className="text-30 lh-12 fw-700">Categories</h1>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div className="eventCard__button">
              <Link
                to="/admin/add-category"
                className="button -sm -rounded -outline-purple-1 text-purple-1 px-25"
              >
                Add Category
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
                    All Categories
                  </button>
                </div>

                <div className="tabs__content py-30 px-30 js-tabs-content">
                  <div className="table-calendar">
                    <table className="w-1/1 table table-striped">
                      <thead>
                        <tr>
                          <th>Sl.no</th>
                          <th>Category Image</th>
                          <th>Type</th>
                          <th>Activated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          // categories.map((categorie, index) => (
                          //   <tr key={index}>
                          //     <td>{ index+1 }</td>
                          //     <td>{ categorie.profileImage }</td>
                          //     <td>{ categorie.name }</td>
                          //     <td>{ categorie.email }</td>
                          //     <td>{ categorie.phone }</td>
                          //     <td></td>
                          //   </tr>
                          // ))
                        }
                        <tr>
                          <td>1</td>
                          <td>Category-1</td>
                          <td>abc</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Category-2</td>
                          <td>xyz</td>
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

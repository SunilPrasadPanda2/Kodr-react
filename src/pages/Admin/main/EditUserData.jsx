import React from "react";
import Footer from "../layout/components/Footer";

function EditUserData() {
  return (
    <div className="dashboard__main">
    <div
      className="dashboard__content bg-light-4"
      style={{ minHeight: "calc(100vh - 210px)" }}
    >
      <div className="row y-gap-30">
        <div className="col-12">
          <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
            <div className="tabs -active-purple-2 js-tabs">
              <div className="tabs__controls d-flex items-center pt-20 px-30 border-bottom-light">
                <button
                  className="text-light-1 lh-12 tabs__button"
                  type="button"
                >
                  Trainer Details
                </button>
              </div>

              <div className="tabs__content py-30 px-30 js-tabs-content">
                <div className="table-calendar">Hii</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default EditUserData

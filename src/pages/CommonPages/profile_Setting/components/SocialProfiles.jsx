import React, { useEffect, useState } from "react";
import { getSocialProfiles, AddSocialPorfiles } from "@/apis/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function SocialProfiles({ activeTab }) {
  const MySwal = withReactContent(Swal);
  const [socialProfiles, setSocialProfiles] = useState({
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSocialProfiles = async () => {
      const response = await getSocialProfiles();
      if (response && response.statusCode === 200) {
        const { socialProfiles } = response.data;
        setSocialProfiles({
          twitter: socialProfiles.twitter || "",
          facebook: socialProfiles.facebook || "",
          instagram: socialProfiles.instagram || "",
          linkedin: socialProfiles.linkedin || "",
        });
      }
    };

    fetchSocialProfiles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialProfiles({ ...socialProfiles, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {};
      // Loop through socialProfiles state to build payload
      Object.keys(socialProfiles).forEach((key) => {
        if (socialProfiles[key]) {
          payload[key] = socialProfiles[key];
        }
      });

      const response = await AddSocialPorfiles(payload);
      if (response && response.statusCode === 200) {
        MySwal.fire({
          title: "Success!",
          text: "Social Profiles updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`tabs__pane -tab-item-3 ${activeTab === 3 ? "is-active" : ""}`}
    >
      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
        <div className="col-md-6">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Twitter
          </label>
          <input
            name="twitter"
            type="text"
            placeholder="Twitter Profile"
            value={socialProfiles.twitter}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Facebook
          </label>
          <input
            name="facebook"
            type="text"
            placeholder="Facebook Profile"
            value={socialProfiles.facebook}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Instagram
          </label>
          <input
            name="instagram"
            type="text"
            placeholder="Instagram Profile"
            value={socialProfiles.instagram}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            LinkedIn Profile URL
          </label>
          <input
            name="linkedin"
            type="text"
            placeholder="LinkedIn Profile"
            value={socialProfiles.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button
            className="button -md -purple-1 text-white"
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              >
                Saving Social Profiles...
              </span>
            ) : (
              "Save Social Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SocialProfiles;

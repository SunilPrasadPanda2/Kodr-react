import { api } from "@/utils/services/axios.service";

export const signUp = async (data) => {
  let response;
  try {
    response = await api.post("/user/register", data);
  } catch (error) {
    return error.response;
  }
  return response.data;
};

export const login = async (data) => {
  let response;
  try {
    response = await api.post("/user/loginWithEmail", data);
  } catch (error) {
    return error.response;
  }

  return response.data;
};

export const logout = async (_id) => {
  // const authData = JSON.parse(localStorage.getItem("persist:auth"));
  // const token = JSON.parse(authData.auth).accessToken;
  // console.log("access token",token);
  let response;
  try {
    response = await api.post(
      "/user/logout",
      { _id }
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
  } catch (error) {
    console.log("error coming");
    console.log("error ", error.response);
    return error.response; // Adjust to return error response
  }
  return response.data;
};

export const userProfile = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  let response;
  try {
    response = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error.response;
  }
  return response.data;
};

export const updateProfile = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  let response;
  try {
    response = await api.post("/user/updateProfile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error.response;
  }
  return response.data;
};

export const changePassword = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  let response;
  try {
    response = await api.post("/user/changePassword", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error.response;
  }
  return response.data;
};

export const getSocialProfiles = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  let response;
  try {
    response = await api.get("/user/getSocialProfiles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error.response;
  }
  return response.data;
};

export const AddSocialPorfiles = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  let response;
  try {
    response = await api.post("/user/addSocialProfiles", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error.response;
  }
  return response.data;
};
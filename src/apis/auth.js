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

export const logout = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  let response;
  try {
    response = await api.post(
      "/user/logout",
      {}, // because this is a post method so we need to use this empty object for data
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error.response;
  }
  return response.data;
};

export const userProfile = async () => {
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

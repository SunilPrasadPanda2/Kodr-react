import { api } from "@/utils/services/axios.service";

export const addUser = async (data) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  let response;
  try {
    response = await api.post("/admin/addUser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error.response;
  }
  return response.data;
};

export const viewUser = async (_id) => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  console.log("token", token);
  console.log("id", _id);
  
  let response;
  try {
    response = await api.get("/admin/viewUser", {
      params: _id, // This will attach your data as query parameters
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error.response;
  }
  return response.data;
};


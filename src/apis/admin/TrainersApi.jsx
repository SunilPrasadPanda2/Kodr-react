import { api } from "@/utils/services/axios.service";

export const trainers = async () => {
  const authData = JSON.parse(localStorage.getItem("persist:auth"));
  const token = JSON.parse(authData.auth).accessToken;
  let response;
  try {
    response = await api.get("/admin/trainers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error.response;
  }
  return response.data;
};

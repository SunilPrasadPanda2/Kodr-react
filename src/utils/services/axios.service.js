// import axios from "axios";

// // const getToken = () => {
// //   return Cookies.get('accessToken');
// // };

// const api = axios.create({
//   baseURL: import.meta.env.VITE_APP_SERVER_URL,
//   // withCrimport Messages from './../../pages/Trainer/layout/components/Messages';
//   edentials: true,
//   // headers: {
//   //   'Authorization': `Bearer ${getToken()}`,
//   // },
// });

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // console.log("axios service responce",response);
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("axios service error", error);
//     console.log("error message", error.response.data.message);
//     // console.log("originalRequest",originalRequest);
//     // Check if we received a 401 error
//     if (
//       error.response.status === 401 &&
//       error.response.data.message === "access token expired"
//     ) {
//       //401 && !originalRequest._retry
//       //  && error.response.data.err.message === "jwt expired"
//       // originalRequest._retry = true; // Marking that we already retried the request
//       try {
//         const authData = JSON.parse(localStorage.getItem("persist:auth"));
//         const refreshToken = JSON.parse(authData.auth).refreshToken;

//         console.log("refresh token", refreshToken);
//         // Call your API to refresh the token
//         const newToken = await api.post("/user/refresh-token", {
//           refreshToken: refreshToken,
//         }); // Replace with your refresh token call
//         // pass refresh token in the body of the above api
//         // update the token in the local storage
//         // console.log("new tokens", newToken);
//         const newAccessToken = newToken.data.data.accessToken; // Assuming data contains the new token
//         const newRefreshToken = newToken.data.data.refreshToken;
//         // Parse the authData and update the token field
//         const updatedAuthData = {
//           ...JSON.parse(authData.auth), // Parse existing authData
//           accessToken: newAccessToken, // Update token field with new value
//           refreshToken: newRefreshToken,
//         };

//         // Stringify the updated authData and store it back in localStorage
//         authData.auth = JSON.stringify(updatedAuthData);
//         localStorage.setItem("persist:auth", JSON.stringify(authData));

//         console.log("tokens updated successfully");
//         // Return the original request with the new token
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Handle errors, e.g., redirect to login if token refresh fails
//         return Promise.reject(refreshError);
//       }
//     }
//     // Return any other errors as is
//     return Promise.reject(error);
//   }
// );

// export { api };
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.message === "access token expired") {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;

      try {
        const authData = JSON.parse(localStorage.getItem("persist:auth"));
        const refreshToken = JSON.parse(authData.auth).refreshToken;
        
        const { data } = await api.post("/user/refresh-token", {
          refreshToken: refreshToken,
        });
        
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        
        const updatedAuthData = {
          ...JSON.parse(authData.auth),
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
        
        localStorage.setItem("persist:auth", JSON.stringify({ auth: JSON.stringify(updatedAuthData) }));
        
        api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };

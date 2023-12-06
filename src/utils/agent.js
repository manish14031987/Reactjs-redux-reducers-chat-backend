import axios from "axios";
const { REACT_APP_API_BASE_URL } = process.env;

const agent = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    deviceType: "web",
    Accept: "application/json",
  },
});

agent.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  config = {
    ...config,
    headers: {
      ...config.headers,
      language: `${localStorage.getItem("i18nextLng")}`,
      "Accept-Language": `${localStorage.getItem("i18nextLng")}`,
    },
  };
  if (!token) {
    return config;
  }

  if (process.browser) {
    config = {
      ...config,
      headers: { ...config.headers, "x-access-token": `${token}` },
    };
  }

  return config;
});

agent.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.status === 401) {
      localStorage.removeItem("persist:admin");
      window.location.href = "/";
    }
    return Promise.reject(error.response.data);
  }
);

export { agent };

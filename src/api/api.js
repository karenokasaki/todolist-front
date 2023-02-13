import axios from "axios";

const apiURLs = {
  development: "http://localhost:1337/api",
  production: "https://strapi-tarotas.onrender.com/api",
};

const api = axios.create({
  baseURL: apiURLs[process.env.NODE_ENV],
});

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization:
      "Bearer dce55ba4058fdd1946310fe835102752edd4c0b012d4cf150900f4a24f5db0afa4780e392ee210a75401bc31c7dd6f5e3997279331b6a33891235cb86d6906c5b66a57a8815c5b6810060f95aab8d01c49a3a56d3a3790f52c36df9251945df5b8b2ad6adc8aa75c4cdd734a96d16a5cf4efa6f796be2925167957416250ee3c",
  };

  return config;
});

export default api;

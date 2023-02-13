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
      "Bearer 03d2b1b795a029322481aa2ba0996556b7a10ed893f23a1314f331e896dc3f6c5868f420a01f5656b0fa94af4942f41eeac950a135e315d5080e77d2ec00a6aa06d4ddf14e162a7a0e5e02f448594c5dbda6e551ebf396bb6f8f77b511699ae0481a8cce6c3acae0ce7879195b9f49f517c9d995a4b3369679b004b5773d1054",
  };

  return config;
});

export default api;

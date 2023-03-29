import axios from "axios";


const API = axios.create({
  baseURL: "https://play-pause-api.vercel.app/api/",
});

export default API;
import axios from "axios";

const Axios = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
    baseURL: "http://localhost:5000/api"
});

export default Axios;

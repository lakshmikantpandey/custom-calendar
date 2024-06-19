import ReactDOM from "react-dom/client";
import "./index.css";
import Calendar2 from "./Calendar.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";


const getQueryParam = (param: string): string | null => {
  return new URLSearchParams(window.location.search).get(param);
};
const TOKENParam = getQueryParam("token");

axios.interceptors.request.use(
  (config) => {
    const headers: any = { Authorization: "" };
    // const token =
    //   "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0ZGEwYmVjMThiMDI3NDkxODRhMDg2MiIsIm1vYmlsZV9ubyI6IjgxMDk2NjY5NDEiLCJkaXNwbGF5X25hbWUiOiJBamF5IiwiZW1haWwiOiJzcGdvMTAwMUBtYWlsaW5hdG9yLmNvbSIsInJvbGUiOiJjY28iLCJjb2RlIjoiMGFqYXkxIiwiaXNfYWN0aXZlIjp0cnVlLCJmY21fdG9rZW4iOltdLCJjbHVzdGVyIjp7Il9pZCI6IjY0ZGEwYjljMThiMDI3NDkxODRhMDg2MSIsIm5hbWUiOiJUZXN0IGNsdXN0ZXIifX0sImlhdCI6MTcxNzEzNTUyNCwiZXhwIjo0ODcyODk1NTI0LCJpc3MiOiJodHRwOi8vdGVjaHBoYW50LmNvbSIsImp0aSI6IjBkMTQwZWUzLWZlMzktNGIxNS1iNDU2LTFlYjY5YTJhMjI4MyJ9.EBI-dfvquPEHlcF66-JhmUrJqCVm6-qUowFGDQcCBPWuAmudwUswqCAnXgXlbXfhsMkr42AQGA4OjYlJTDBqLg";
    if (TOKENParam) {
      // headers['Authorization'] = `Bearer ${token}`;
      headers["Authorization"] = `Bearer ${TOKENParam}`;
    }
    config.headers = headers;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Calendar2 />
    <ToastContainer />
  </>
);

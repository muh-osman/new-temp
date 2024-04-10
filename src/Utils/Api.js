import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

export default api;

// Past this code in any file you want to fetch data in it
/* 
// Me(Axios)
import api from "../../api";
.
.
.
async function fetchUsers() {
  try {
    const res = await api.get("/user/show");
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}
*/

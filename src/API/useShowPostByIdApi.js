import { useQuery } from "@tanstack/react-query";
// Cookies
import { useCookies } from "react-cookie";
// API
import API from "./Api";

export default function useShowPostByIdApi({ id }) {
  // Cookies
  const [cookies, setCookie] = useCookies(["token"]);

  const fetchPostById = async () => {
    const res = await API.get(`api/posts/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    return res.data;
  };

  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(),
  });
}

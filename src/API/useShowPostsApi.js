import { useQuery } from "@tanstack/react-query";
// Cookies
import { useCookies } from "react-cookie";
// API
import API from "./Api";

export const fetchPosts = async (token) => {
  const res = await API.get("api/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default function useShowPostsApi() {
  // Cookies
  const [cookies, setCookie] = useCookies(["token"]);

  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(cookies.token),
  });
}

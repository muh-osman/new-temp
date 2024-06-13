import { useMutation, useQueryClient } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { toast } from "react-toastify";
// Api
import { fetchPosts } from "./useShowPostsApi";

export const useDeletePostApi = () => {
  const qc = useQueryClient();
  // Cookies
  const [cookies, setCookie] = useCookies(["token"]);

  return useMutation({
    mutationFn: async (id) => {
      const res = await API.delete(`api/posts/${id}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      return res.data;
    },

    onSuccess: () => {
      qc.prefetchQuery({
        queryKey: ["posts"],
        queryFn: () => fetchPosts(cookies.token),
      });
    },

    onError: (err) => {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.error(errorMessage);
    },
  });
};

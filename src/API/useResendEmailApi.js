import { useMutation } from "@tanstack/react-query";
// API base
import API from "./Api";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { toast } from "react-toastify";

export const useResendEmailApi = () => {
  // Cookies
  const [cookies, setCookie] = useCookies(["token"]);

  return useMutation({
    mutationFn: async () => {
      const res = await API.post(
        "api/resend-verify-email",
        {},
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      return res.data;
    },

    onMutate: () => {
      return toast.loading("Sending verification email...");
    },

    onSuccess: (data, variables, context) => {
      toast.update(context, {
        render: "Email sent.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    },

    onError: (err, variables, context) => {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.update(context, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    },
  });
};

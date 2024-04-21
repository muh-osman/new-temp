// API
import api from "../Utils/Api";
// Cookies
import { useCookies } from "react-cookie";

const CustomToast = ({ closeToast }) => {
  // Cookie
  const [cookies, setCookie] = useCookies(["token"]);

  const resendEmail = async () => {
    try {
      const res = await api.post(
        `api/resend-verify-email`,
        {},
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <style>
        {`
            .resendButton {
              border: none;
              background-color: transparent;
              color: #0d6efd;
              cursor: pointer;
            }
            .resendButton:hover {
              color: #0b5ed7;
            }
          `}
      </style>

      <div style={{ cursor: "auto" }}>
        Please verify your email, or
        <button
          className="resendButton"
          onClick={() => {
            // Resend email logic here
            resendEmail();
            closeToast(); // Close the toast notification
          }}
        >
          resend
        </button>{" "}
        verification email.
      </div>
    </>
  );
};

export default CustomToast;

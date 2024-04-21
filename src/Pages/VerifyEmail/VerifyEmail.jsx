import style from "./VerifyEmail.module.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// API
import api from "../../Utils/Api";
// Cookies
import { useCookies } from "react-cookie";

export default function VerifyEmail() {
  // Cookies
  const [cookies, setCookie] = useCookies(["verified"]);
  //
  const [response, setResponse] = useState("");
  // Parse the query parameters from the URL
  //   http://localhost:3000/verify-email?expires=XXX&hash=XXX&id=XXX&signature=XXX
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hash = searchParams.get("hash");
  const id = searchParams.get("id");

  const verifyEmailAddress = async (event) => {
    try {
      const res = await api.post(`api/verify-email`, {
        hash: hash,
        id: id,
      });
      // console.log(res);
      setResponse(res?.data?.message);
      setCookie("verified", "verified"); // Set Cookie verified to hide "please verified" message
    } catch (err) {
      console.error(err);
      setResponse(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    verifyEmailAddress();
  }, []);

  return (
    <div className={style.container}>
      {response ? (
        <>
          <h1>{response}</h1>
          <Link to="/">Go home</Link>
        </>
      ) : (
        <>
          <h1>Verifying email address</h1>
          <div className={style.spinner}></div>
        </>
      )}
    </div>
  );
}

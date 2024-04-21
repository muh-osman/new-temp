// React router
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
// Mui
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// API
import api from "../../Utils/Api";
// Toastify
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        component={RouterLink}
        to="/"
        onMouseOver={(e) => (e.target.style.color = "#7431fa")}
        onMouseOut={(e) => (e.target.style.color = "inherit")}
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#7431fa", // Your desired shade of red
    },
    // ... other colors
  },
  // ... other theme options
});

export default function ForgotPassword() {
  const [inputs, setInputs] = React.useState({
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  //  Submit button
  const [loading, setLoading] = React.useState(false);
  //
  const [disable, setDisable] = React.useState(false);
  //
  const navigate = useNavigate(); //After Submit
  //
  const formRef = React.useRef();

  // Parse the query parameters from the URL
  //   http://localhost:3000/reset-password?token=...&email=...
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // required input
    const validate = formRef.current.reportValidity();
    if (!validate) return;
    //
    if (inputs.password !== inputs.passwordConfirmation) {
      toast.error("Passwords do not match.");
      return false;
    }

    // Button animation on
    setLoading(true);
    // Disable input & submit button
    setDisable(true);

    const data = new FormData(event.currentTarget);

    try {
      const res = await api.post(`api/reset-password`, {
        token: token,
        email: email,
        password: inputs.password,
        password_confirmation: inputs.passwordConfirmation,
      });
      // console.log(res);
      toast.success("Your password has been reset.");
      setLoading(false);

      // Navigate the user to the login page after a delay
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 6000); // 3 seconds delay
    } catch (err) {
      console.error(err);
      setLoading(false);
      setDisable(false);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        {/* Start Toastify */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {/* End Toastify */}
        <CssBaseline />
        <Box sx={{ width: "100%" }}>
          <Avatar
            sx={{
              margin: "auto",
              marginBottom: "8px",
              bgcolor: "secondary.main",
            }}
          >
            <PasswordIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Reset Password
          </Typography>
          <Box
            ref={formRef}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="New password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  autoFocus
                  value={inputs.password}
                  onChange={handleChange}
                  disabled={disable} // Disable the input field if the form has been submitted
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirm-password"
                  label="Confirm new password"
                  type="password"
                  name="passwordConfirmation"
                  autoComplete="password"
                  value={inputs.passwordConfirmation}
                  onChange={handleChange}
                  disabled={disable} // Disable the input field if the form has been submitted
                />
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              disableRipple
              loading={loading}
              disabled={disable} // Disable submit button if the form has been submitted
              sx={{ mt: 3, mb: 2, transition: "0.1s" }}
            >
              Reset Password
            </LoadingButton>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

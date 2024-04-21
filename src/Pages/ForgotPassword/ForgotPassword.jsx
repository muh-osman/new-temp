// React router
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  //  Submit button
  const [loading, setLoading] = React.useState(false);
  //
  const [disable, setDisable] = React.useState(false);
  //
  const formRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // required input
    const validate = formRef.current.reportValidity();
    if (!validate) return;

    // Button animation on
    setLoading(true);
    // Disable input & submit button
    setDisable(true);

    const data = new FormData(event.currentTarget);

    // console.log({
    //   email: data.get("email"),
    // });

    try {
      const res = await api.post(`api/forgot-password`, data);
      // console.log(res);
      // Show success message
      toast.success("Password reset email sent! Check your inbox.");
      // Button animation of
      setLoading(false);
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
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Forgot Password
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
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
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
              Continue
            </LoadingButton>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

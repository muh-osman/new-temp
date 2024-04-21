// React router
import { Link as RouterLink, useNavigate } from "react-router-dom";
// Mui
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
// API
import api from "../../Utils/Api";
// Cookies
import { useCookies } from "react-cookie";
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

export default function LogIn() {
  //  Submit button
  const [loading, setLoading] = React.useState(false);
  //
  const navigate = useNavigate(); //After Signin
  // Cookies
  const [cookies, setCookie] = useCookies(["token", "verified"]);
  const formRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // required input
    const validate = formRef.current.reportValidity();
    if (!validate) return;

    // Button animation & Disable input
    setLoading(true);

    const data = new FormData(event.currentTarget);

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    try {
      const res = await api.post(`api/login`, data);
      // console.log(res.data);
      setCookie("verified", res.data.user.email_verified_at);
      setCookie("token", res.data.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setLoading(false);
      const errorMessage =
        err?.response?.data?.message || err?.message || "An error occurred";
      // Toastify
      toast.error(errorMessage);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
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
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100vh",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              ref={formRef}
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                disabled={loading} // Disable the input field if the form has been submitted
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={loading} // Disable the input field if the form has been submitted
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                disabled={loading} // Disable the input field if the form has been submitted
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                disableRipple
                loading={loading}
                sx={{ mt: 3, mb: 2, transition: "0.1s" }}
              >
                Log in
              </LoadingButton>

              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

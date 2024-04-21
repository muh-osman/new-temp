import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// Image logo
import logo from "../Assets/Images/logo.png";
// MUI icons
import StyleIcon from "@mui/icons-material/Style";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AddBoxIcon from "@mui/icons-material/AddBox";
// React router
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
// API
import api from "../Utils/Api";
// Cookies
import { useCookies } from "react-cookie";
// Toastify
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "../Components/CustomToast ";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  //  Logout button
  const [loading, setLoading] = React.useState(false);
  // Cookie
  const [cookies, setCookie, removeCookie] = useCookies(["token", "verified"]);

  //
  const nav = useNavigate();
  //   const [data, setData] = useState([]);

  //   async function fetchData() {
  //     try {
  //       const res = await api.get("api/cards");
  //       setData(res.data);
  //       // console.log(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const pages = [
    {
      id: 1,
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon sx={{ color: "#757575" }} />,
    },
    {
      id: 2,
      title: "Add",
      path: "/dashboard/add",
      icon: <AddBoxIcon sx={{ color: "#757575" }} />,
    },
    {
      id: 3,
      title: "Edit",
      path: "/dashboard/edit",
      icon: <AutoFixHighIcon sx={{ color: "#757575" }} />,
    },
  ];

  const { pathname } = useLocation();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar style={{ justifyContent: "center" }}>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{
                width: 50,
                height: 50,
                textAlign: "center",
                borderRadius: 0,
              }}
            />
          </Stack>
        </Link>
      </Toolbar>
      <Divider />

      <List>
        {pages.map((item) => {
          return (
            <ListItem
              dir="ltr"
              key={item.id}
              disablePadding
              button
              component={Link}
              to={item.path}
              selected={item.path === pathname}
            >
              <ListItemButton sx={{ color: "#757575" }}>
                <ListItemIcon>
                  <Avatar
                    alt="icon"
                    sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: "transparent",
                    }}
                  >
                    {item.icon}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* <Divider /> */}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const logout = async () => {
    // Button animation
    setLoading(true);

    try {
      await api.post(
        `api/logout`,
        {},
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      );
      // Remove the token cookie
      removeCookie("verified");
      removeCookie("token");
      // Redirect to the login page
      // nav("/login", { replace: true });
    } catch (err) {
      console.error(err);
      // Remove the token cookie
      removeCookie("verified");
      removeCookie("token");
    }
  };

  // Toastify
  const notify = () => toast.warn(<CustomToast />);
  //
  React.useEffect(() => {
    if (cookies.token && !cookies.verified) {
      const verifyNotification = setTimeout(notify, 5000);

      return () => clearTimeout(verifyNotification);
    }
  }, [cookies.token, cookies.verified]);

  return (
    <Box sx={{ display: "flex" }} dir="ltr">
      {/* Start Toastify */}
      <ToastContainer
        position="top-center"
        newestOnTop={false}
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      {/* End Toastify */}

      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#7431fa",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div className="nav_link" style={{ marginLeft: "auto" }}>
            <LoadingButton
              onClick={logout}
              variant="contained"
              disableRipple
              loading={loading}
              loadingIndicator={
                <CircularProgress sx={{ color: "#fbfbfb" }} size={24} />
              } // Customize the loader color here
              sx={{
                backgroundColor: "#fbfbfb",
                color: "#7431fa",
                border: "1px solid #fbfbfb",
                transition: "0.1s",
                "&:hover": {
                  backgroundColor: "#7431fa",
                  color: "#fbfbfb",
                },
              }}
            >
              Logout
            </LoadingButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#fbfbfb",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default React.memo(ResponsiveDrawer);

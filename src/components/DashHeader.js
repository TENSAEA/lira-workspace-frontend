import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info"; // Import Info icon
import Logo from "./asset/LOGO.png"; // Replace with the actual path to your logo component or image
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Define your route regex patterns
const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();

  // Get the current theme and check for screen size
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography sx={{ color: "error.main" }}>
        Error: {error.data?.message}
      </Typography>
    );
  }

  // Adjust header heights based on screen size
  let headerHeight = isSmallScreen ? "66px" : "120px";
  if (
    DASH_REGEX.test(pathname) ||
    NOTES_REGEX.test(pathname) ||
    USERS_REGEX.test(pathname)
  ) {
    headerHeight = isSmallScreen ? "88px" : "120px";
  }

  const handleAboutUsClick = () => {
    navigate("/dash/aboutus");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: headerHeight,
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            padding: "0 16px",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Link
              to="/dash"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  flexGrow: 1,
                  color: "black",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  fontSize: isSmallScreen ? "1.3rem" : "3rem", // Responsive font size
                }}
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    marginRight: "10px", // Added some space between logo and text
                    height: isSmallScreen ? "33px" : "200px", // Responsive logo height
                  }}
                />
                LIRA Workspace
              </Typography>
            </Link>

            <Box>
              <IconButton
                color="inherit"
                title="About Us"
                onClick={handleAboutUsClick}
                sx={{
                  padding: "4px",
                  marginRight: "10px",
                  "& .MuiSvgIcon-root": {
                    fontSize: isSmallScreen ? "1.6rem" : "3.5rem", // Responsive icon size
                  },
                }}
              >
                <InfoIcon />
              </IconButton>

              <IconButton
                color="inherit"
                title="Logout"
                onClick={sendLogout}
                sx={{
                  padding: "4px",
                  "& .MuiSvgIcon-root": {
                    fontSize: isSmallScreen ? "1.6rem" : "3.5rem", // Responsive icon size
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashHeader;

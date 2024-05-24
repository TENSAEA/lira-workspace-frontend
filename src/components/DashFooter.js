import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DashFooter = () => {
  const { pathname } = useLocation();
  let icon = null;
  const { username, status } = useAuth();
  if (pathname !== "/dash") {
    icon = <FontAwesomeIcon icon={faHouse} size="2x" />;
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="footer"
      sx={{
        py: isSmallScreen ? 0 : 0.5,
        px: 4,
        backgroundColor: "#15202b",
        color: "#fff",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-start",
            alignItems: "center",
            flexDirection: isSmallScreen ? "row" : "row",
            textAlign: isSmallScreen ? "center" : "left",
          }}
        >
          <Link to="/dash" style={{ color: "inherit", textDecoration: "none" }}>
            {icon}
          </Link>

          <Box sx={{ mt: isSmallScreen ? 1 : 2, ml: !isSmallScreen ? 2 : 1 }}>
            <Typography
              variant={isSmallScreen ? "h6" : "h4"}
              sx={{
                fontWeight: "bold",
                color: "white",
                fontFamily: "initial",
                fontSize: isSmallScreen
                  ? "1.2rem"
                  : isMediumScreen
                  ? "1.6rem"
                  : "1.8rem",
                marginBottom: "1.5px",
              }}
            >
              Current User: {username}
            </Typography>
            <Typography
              variant={isSmallScreen ? "body1" : "h6"}
              sx={{
                fontStyle: "italic",
                color: "white",
                fontSize: isSmallScreen
                  ? "1rem"
                  : isMediumScreen
                  ? "1.2rem"
                  : "1.3rem",
                fontFamily: "initial",
              }}
            >
              Status: {status}
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <Typography
            variant={isSmallScreen ? "body2" : "body1"}
            sx={{
              color: "white",
              fontSize: isSmallScreen ? "0.8rem" : "0.9rem",
              textAlign: "center",
            }}
          >
            © 2024, Designed by Tensae Aschalew
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DashFooter;

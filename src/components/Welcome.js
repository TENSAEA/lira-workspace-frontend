import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { breakpoints } from "@mui/system";

// Define animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Welcome = () => {
  const { isManager, isAdmin } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 350px)",
      }}
    >
      <Container maxWidth="md" sx={{ my: 4, textAlign: "center" }}>
        <Box
          sx={{
            p: { xs: 3, sm: 4 }, // Responsive padding
            backgroundColor: "#f0f0f0",
            borderRadius: 2,
            animation: `${fadeIn} 1s ease-out`, // Apply animation
          }}
        >
          <Typography
            variant={isSmallScreen ? "h5" : "h3"}
            fontFamily={"initial"}
            gutterBottom
            sx={{
              animation: `${pulse} 3s infinite`, // Apply pulse animation
            }}
          >
            You Logged in Successfully, Welcome!
          </Typography>
          {/* User List Link (only visible to managers and admins) */}
          {(isManager || isAdmin) && (
            <Box sx={{ mb: 3 }}>
              {" "}
              {/* Increase margin for better spacing */}
              <Link to="/dash/users" style={{ textDecoration: "none" }}>
                <Chip
                  icon={<PeopleIcon />}
                  label="Users List"
                  color="primary"
                  variant="outlined"
                  sx={{
                    mb: 2,
                    p: "0 24px", // Increase padding for larger size
                    fontSize: "1.5rem", // Increase font size for larger buttons
                    height: "48px", // Increase height for larger visual size
                    "& .MuiChip-icon": {
                      fontSize: "2rem", // Increase icon size
                      color: "inherit", // Make icon inherit color
                    },
                    "&:hover": {
                      backgroundColor: "#e0e0e0", // Add subtle hover effect
                    },
                    transition: `${theme.transitions.create(
                      ["background-color", "transform"],
                      {
                        duration: theme.transitions.duration.short,
                      }
                    )}`,
                    "&:active": {
                      transform: "scale(0.95)", // Add click effect
                    },
                  }}
                />
              </Link>
            </Box>
          )}
          {/* Notes List Link */}
          <Box>
            <Link to="/dash/notes" style={{ textDecoration: "none" }}>
              <Chip
                icon={<ListAltIcon />}
                label="Tasks List"
                color="primary"
                variant="outlined"
                sx={{
                  p: "0 24px", // Increase padding for larger size
                  fontSize: "1.5rem", // Increase font size for larger buttons
                  height: "48px", // Increase height for larger visual size
                  "& .MuiChip-icon": {
                    fontSize: "2rem", // Increase icon size
                    color: "inherit", // Make icon inherit color
                  },
                  "&:hover": {
                    backgroundColor: "#e0e0e0", // Add subtle hover effect
                  },
                  transition: `${theme.transitions.create(
                    ["background-color", "transform"],
                    {
                      duration: theme.transitions.duration.short,
                    }
                  )}`,
                  "&:active": {
                    transform: "scale(0.95)", // Add click effect
                  },
                }}
              />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Welcome;

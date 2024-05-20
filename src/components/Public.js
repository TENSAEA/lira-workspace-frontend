import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import ReactPlayer from "react-player";
import Lira from "./asset/Lira.mp4";

const Public = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: "center", animation: "fade-in 2s" }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            "@keyframes fade-in": {
              "0%": {
                opacity: 0,
                transform: "translateY(-20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
            animation: "fade-in 2s ease-out",
          }}
        >
          LIRA Workspace
        </Typography>
        <Box
          sx={{
            position: "relative",
            paddingTop: "50.25%",
            height: 0,
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            className="video"
            url={Lira}
            playing
            muted
            loop
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            playsInline
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{
            mt: 4,
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
          }} // Responsive font size for button
        >
          Login
        </Button>
        <Box sx={{ overflow: "hidden", width: "100%", mt: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              display: "inline-block",
              whiteSpace: "nowrap",
              fontFamily: "sans-serif",
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, // Responsive font sizes
              letterSpacing: 1,
              "@keyframes scroll-ltr": {
                "0%": {
                  transform: "translateX(100%)",
                },
                "100%": {
                  transform: "translateX(-100%)",
                },
              },
              animation: "scroll-ltr 20s linear 0s infinite", // Start instantly and slide slowly
            }}
          >
            LIRA Workspace is a project management platform designed for
            companies to efficiently manage tasks and collaboration among
            employees. It streamlines workflow, enhances productivity, and
            fosters seamless communication, ensuring all team members stay
            aligned and projects are completed on time.{" "}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Public;

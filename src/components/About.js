import React from "react";
import ReactPlayer from "react-player";
import { Typography, Box, Container } from "@mui/material";
import Lira from "../components/asset/Lira.mp4";
const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h3" fontFamily={"initial"} gutterBottom>
          About LIRA Workspace
        </Typography>
        <Typography variant="body1" gutterBottom>
          This site is a project management platform designed to streamline
          workflow and enhance team collaboration.
        </Typography>
        <Box sx={{ position: "relative", paddingTop: "56.25%", height: 0 }}>
          <ReactPlayer
            url={Lira}
            playing
            loop
            controls
            width="100%"
            height="80%"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default About;

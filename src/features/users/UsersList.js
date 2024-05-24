import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import Button from "@mui/material/Button";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  CircularProgress,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const UsersList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress size={60} thickness={4} color="secondary" />
      </Box>
    );
  } else if (isError) {
    content = (
      <Container maxWidth="lg">
        <Typography color="error" variant="h6">
          {error?.data?.message}
        </Typography>
      </Container>
    );
  } else if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length ? (
      ids.map((id) => <User key={id} id={id} />)
    ) : (
      <TableRow>
        <TableCell colSpan={5} align="center">
          No Users Found
        </TableCell>
      </TableRow>
    );

    content = (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              flexGrow: 1,
              maxHeight: 380,
              overflowY: "auto",
            }} // Adjust maxHeight as needed
          >
            <Table aria-label="users table" stickyHeader>
              <TableHead>
                <TableRow>
                  {["Id", "Username", "Roles", "Active", "Edit"].map(
                    (headCell) => (
                      <TableCell
                        key={headCell}
                        align="center"
                        sx={{
                          backgroundColor: "#04AA6D",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {headCell}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>{tableContent}</TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ ml: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/dash/users/newUser")}
            >
              Add New User
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return <>{content}</>;
};

export default UsersList;

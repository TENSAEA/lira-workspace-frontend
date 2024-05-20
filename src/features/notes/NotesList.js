import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { selectNotesByUsername } from "./notesApiSlice";
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
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const NotesList = () => {
  const navigate = useNavigate();
  const { isManager, isAdmin } = useAuth();
  const token = useSelector(selectCurrentToken);
  const decoded = jwtDecode(token);
  const { username } = decoded.UserInfo;
  const currentUserNotes = useSelector((state) =>
    selectNotesByUsername(state, username)
  );

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery();

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
    const ids =
      isManager || isAdmin
        ? notes.ids
        : currentUserNotes.map((note) => note.id);

    const tableContent = ids?.length ? (
      ids.map((noteId, index) => (
        <Note
          key={noteId}
          noteId={noteId}
          style={index % 2 === 0 ? { backgroundColor: "#f2f2f2" } : null}
        />
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6} align="center">
          No Tasks Found
        </TableCell>
      </TableRow>
    );

    content = (
      <Container maxWidth="lg" sx={{ mt: 4, display: "flex", gap: 2 }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            flexGrow: 1,
            maxHeight: 500, // Approximate height for 4 rows + header
            overflowY: "auto",
          }}
        >
          <Table aria-label="notes table" stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "Username",
                  "Created",
                  "Updated",
                  "Title",
                  "Owner",
                  "Edit",
                ].map((headCell) => (
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
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{tableContent}</TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/dash/notes/newNote")}
            sx={{ mb: 2 }}
          >
            New Task
          </Button>
        </Box>
      </Container>
    );
  }

  return <>{content}</>;
};

export default NotesList;

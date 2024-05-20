import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const EditNoteForm = ({ note, users }) => {
  const { isManager, isAdmin } = useAuth();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  let deleteButton = null;

  if (isManager || isAdmin) {
    deleteButton = (
      <Button
        variant="contained"
        color="error"
        onClick={onDeleteNoteClicked}
        startIcon={<FontAwesomeIcon icon={faTrashCan} />}
      >
        Delete
      </Button>
    );
  }

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.username}
    </MenuItem>
  ));

  const errContent = error?.data?.message || delerror?.data?.message || "";

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 2,
          boxShadow: 3,
          backgroundColor: "white",
          borderRadius: 2,
          mt: 5,
        }}
      >
        {errContent && <Alert severity="error">{errContent}</Alert>}

        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5">Edit Note #{note.ticket}</Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={onSaveNoteClicked}
                disabled={!canSave}
                startIcon={<FontAwesomeIcon icon={faSave} />}
              >
                Save
              </Button>
              {deleteButton}
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={onTitleChanged}
            variant="outlined"
            margin="normal"
            required
            error={!title}
            helperText={!title && "Title is required"}
          />

          <TextField
            fullWidth
            label="Text"
            value={text}
            onChange={onTextChanged}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            required
            error={!text}
            helperText={!text && "Text is required"}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={onCompletedChanged}
                color="primary"
              />
            }
            label="Work Complete"
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="note-user-label">Assigned To</InputLabel>
            <Select
              labelId="note-user-label"
              value={userId}
              onChange={onUserIdChanged}
              variant="outlined"
            >
              {options}
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2" color="textSecondary">
              Created:
              <br />
              {created}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Updated:
              <br />
              {updated}
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EditNoteForm;

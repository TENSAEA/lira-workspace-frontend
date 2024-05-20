import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Container,
} from "@mui/material";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    setRoles(e.target.value);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => (
    <MenuItem key={role} value={role}>
      {role}
    </MenuItem>
  ));

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        p={3}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
        mt={4}
        onSubmit={(e) => e.preventDefault()}
      >
        <Box
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">New User</Typography>
          <Button
            type="submit"
            variant="contained"
            color={canSave ? "primary" : "error"}
            onClick={onSaveUserClicked}
            disabled={!canSave}
            startIcon={<FontAwesomeIcon icon={faSave} />}
          >
            Save
          </Button>
        </Box>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Username [3-20 letters]"
            value={username}
            onChange={onUsernameChanged}
            error={!validUsername && username.length > 0}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            type="password"
            label="Password [4-12 chars incl. !@#$%]"
            value={password}
            onChange={onPasswordChanged}
            error={!validPassword && password.length > 0}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>ASSIGNED ROLES</InputLabel>
          <Select
            multiple
            value={roles}
            onChange={onRolesChanged}
            renderValue={(selected) => selected.join(", ")}
          >
            {options}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};

export default NewUserForm;

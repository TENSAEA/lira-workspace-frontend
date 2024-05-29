import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";

const Login = () => {
  const userRef = useRef();
  // const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false); // Hide alert on new submission

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      // errRef.current.focus();
      setShowAlert(true);
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handlePersist = () => setPersist((prev) => !prev);

  // const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading)
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );

  const content = (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Paper elevation={6} style={{ padding: "40px", margin: "20px" }}>
          {" "}
          {/* Increased padding */}
          <Typography variant="h4" component="h1" gutterBottom>
            Employee Login
          </Typography>
          <Typography
            variant="body"
            component="h5"
            fontFamily="initial"
            gutterBottom
          >
            Test-Admin-Username:lira & Test-Admin-Password:lira
          </Typography>
          <Typography
            variant="body"
            component="h5"
            fontFamily="initial"
            gutterBottom
          >
            Test-Employee-Username:Lira & Test-Employee-Password:Lira
          </Typography>
          {showAlert && (
            <Alert severity="error" onClose={() => setShowAlert(false)}>
              {errMsg}
            </Alert>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Username"
              inputRef={userRef}
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              required
              value={username}
              onChange={handleUserInput}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handlePwdInput}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={persist}
                  onChange={handlePersist}
                />
              }
              label="Trust This Device"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="form__submit-button"
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs marginTop={"10px"}>
                <Link to="/" variant="body2">
                  Back to Home
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );

  return content;
};

export default Login;

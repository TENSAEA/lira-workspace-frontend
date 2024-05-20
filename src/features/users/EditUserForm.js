import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { green, red, grey } from "@mui/material/colors";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    const userToUpdate = {
      id: user.id,
      username,
      roles,
      active,
    };

    if (password) {
      userToUpdate.password = password;
    }

    await updateUser(userToUpdate);
    navigate("/dash/users");
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  return (
    <>
      <style>
        {`
          .form {
            padding: 1rem;
            border: 1px solid ${grey[300]};
            border-radius: 4px;
            max-width: 600px;
            margin: auto;
          }
          .form__title-row {
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .form__action-buttons .icon-button {
            margin-right: 0.5rem;
            padding: 1rem;
            border: none;
            color: white;
            cursor: pointer;
          }
          .form__action-buttons .icon-button:first-child {
            background-color: ${green[500]};
          }
          .form__action-buttons .icon-button:last-child {
            background-color: ${red[500]};
            margin-right: 0;
          }
          .form__label {
            display: block;
            margin-bottom: 1rem;
            font-weight: 500;
            font-size:1.2em;
          }
          .form__input,
          .form__select {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border: 1px solid ${grey[400]};
            border-radius: 4px;
          }
          .form__select{
            width: 100%;
            padding: 10px;
            margin-bottom: 1rem;
            border: 1px solid ${grey[400]};
            border-radius: 4px;
            font-size: 1rem;
          }
          .form__checkbox-container {
            display: block;
            margin-bottom: 1rem;
            font-weight: 500;
            padding:1rem;
          }
          .form__checkbox {
            margin-left: 0.5rem;
            margin-bottom:1rem;
          }
          @media(max-width: 600px) {
            .form__title-row {
              flex-direction: column;
              align-items: flex-start;
            }
            .form__action-buttons {
              order: -1;
              margin-bottom: 1rem;
            }
          }
        `}
      </style>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className="form__input"
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />
        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#%]</span>
        </label>
        <input
          className={`form__input`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>
        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className="form__select"
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default EditUserForm;

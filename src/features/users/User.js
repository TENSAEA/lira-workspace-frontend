import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const User = ({ id }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => selectUserById(state, id));

  const handleEdit = () => navigate(`/dash/users/${id}`);

  if (!user) return null;

  const activeStyle = {
    backgroundColor: user.active ? "#e0ffdd" : "#ffe0e0", // Green for active, red for inactive
  };

  return (
    <TableRow sx={activeStyle}>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.roles.join(", ")}</TableCell>
      <TableCell>{user.active ? "Yes" : "No"}</TableCell>
      <TableCell>
        <button
          onClick={handleEdit}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default User;

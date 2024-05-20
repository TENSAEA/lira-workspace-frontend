import { useState, useEffect } from "react";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useGetUsersQuery } from "../users/usersApiSlice";
const NewNoteForm = () => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  const { data: user } = useGetUsersQuery();
  const { entities: userEntities } = user || { entities: {} };

  const users = Object.values(userEntities);
  console.log(users);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(
    users && users.length > 0 ? users[0].id : ""
  );
  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const options = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));
  return (
    <>
      <style>
        {`
          .form {
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            max-width: 500px;
            margin: 2rem auto;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .form__title-row {
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .icon-button {
            background-color: #28a745;
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            align-items: center;
          }
          .icon-button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
          .form__label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: bold;
          }
          .form__input,
          .form__select,
          .form__textarea {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
          }
          .form__textarea {
            height: 100px;
            resize: vertical;
          }

          @media (max-width: 600px) {
            .form {
              padding: 0.1rem;
              margin: 1.5rem;
              width: 88%;
            }
            .form__title-row {
              flex-direction: column;
              align-items: flex-start;
            }
            .form__title-row h2 {
              font-size: 1.5rem;
              margin-bottom: 0.5rem;
            }
            .icon-button {
              align-self: flex-end;
              padding: 0.3rem 0.6rem;
              font-size: 0.875rem;
            }
            .form__input,
            .form__select,
            .form__textarea {
              padding: 0.5rem;
              font-size: 0.875rem;
              width:80%;
            }
            .form__textarea {
              height: 80px;
            }
          }
          
        `}
      </style>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>New Task</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              type="submit"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon
                icon={faSave}
                style={{ marginRight: "0.5rem" }}
              />
              Save
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className="form__input"
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <textarea
          className="form__input form__textarea"
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <label className="form__label" htmlFor="userId">
          ASSIGNED TO:
        </label>
        <select
          id="userId"
          name="userId"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default NewNoteForm;

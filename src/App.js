import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./components/Welcome";
import Login from "./features/auth/login";
import UsersList from "./features/users/UsersList";
import NotesList from "./features/notes/NotesList";
import EditUser from "./features/users/EditUser";
import Prefetch from "./features/auth/Prefetch";
import NewUserForm from "./features/users/NewUserForm";
import NewNoteForm from "./features/notes/NewNoteForm";
import EditNote from "./features/notes/EditNote";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import About from "./components/About";

function App() {
  useTitle("Lira-Workspace");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Welcome />} />
                  <Route path="aboutus" element={<About />} />

                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Admin, ROLES.Manager]}
                      />
                    }
                  >
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="newUser" element={<NewUserForm />} />
                    </Route>
                  </Route>

                  <Route path="notes">
                    <Route index element={<NotesList />} />
                    <Route path=":id" element={<EditNote />} />
                    <Route path="newNote" element={<NewNoteForm />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

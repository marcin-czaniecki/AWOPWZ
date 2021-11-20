import RequireAuth from "components/organisms/RequireAuth/RequireAuth";
import { ProjectProvider } from "hooks/useProject";
import { Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import NoMatch from "./pages/NoMatch/NoMatch";
import Profile from "./pages/Profile/Profile";
import Project from "./pages/Project/Project";
import Projects from "./pages/Projects/Projects";
import Users from "./pages/Users/Users";

export const views = [
  {
    to: "/",
    text: "dashboard",
    path: "/",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
  {
    to: "/profile",
    text: "profil",
    path: "/profile",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    to: "/users",
    text: "użytkownicy",
    path: "/users",
    element: (
      <RequireAuth>
        <Users />
      </RequireAuth>
    ),
  },
  {
    to: "/projects",
    text: "projekty",
    path: "/projects",
    element: (
      <RequireAuth>
        <Projects />
      </RequireAuth>
    ),
  },
  {
    to: null,
    text: null,
    path: "/projects/:id",
    element: (
      <RequireAuth>
        <ProjectProvider>
          <Project />
        </ProjectProvider>
      </RequireAuth>
    ),
  },
  { to: null, text: null, path: "*", element: <Route path="*" element={<NoMatch />} /> },
];

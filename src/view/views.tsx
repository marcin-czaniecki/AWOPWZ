import RequireAuth from "components/organisms/RequireAuth/RequireAuth";
import { ProjectProvider } from "hooks/useProject";
import { IView } from "types/types";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Project from "./pages/Project/Project";
import Projects from "./pages/Projects/Projects";
import Team from "./pages/Team/Team";
import Teams from "./pages/Teams/Teams";
import Users from "./pages/Users/Users";

export const views: IView[] = [
  {
    to: "/dashboard",
    text: "dashboard",
    path: "/dashboard",
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
    to: "/teams",
    text: "Zespoły",
    path: "/teams",
    element: (
      <RequireAuth>
        <Teams />
      </RequireAuth>
    ),
  },
  {
    to: null,
    text: null,
    path: "/teams/:id",
    element: (
      <RequireAuth>
        <Team />
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
];

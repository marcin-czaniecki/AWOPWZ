import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import RequireAuth from "components/organisms/RequireAuth/RequireAuth";
import NoMatch from "view/pages/NoMatch/NoMatch";
import Dashboard from "view/pages/Dashboard/Dashboard";
import Chat from "components/organisms/Chat/Chat";
import { auth } from "data/fb";
import Projects from "./pages/Projects/Projects";
import MainTemplate from "components/templates/MainTamplate/MainTamplate";
import Project from "./pages/Project/Project";
import { useError } from "hooks/useError";
import Toast from "components/organisms/Toast/Toast";
import Loading from "components/molecules/Loading/Loading";
import { ProjectProvider } from "hooks/useProject";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";

const Root = () => {
  const [user, loading, error] = useAuthState(auth);

  const location = useLocation();
  const hookError = useError();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <MainTemplate>
        <Routes>
          <Route
            path="/unauthorization"
            element={!user ? <Unauthorized /> : <Navigate to="/" state={{ from: location }} />}
          />
          <Route
            index
            element={
              <RequireAuth>
                <Dashboard />
                <Chat />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/projects"
            element={
              <RequireAuth>
                <Projects />
              </RequireAuth>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <RequireAuth>
                <ProjectProvider>
                  <Project />
                </ProjectProvider>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </MainTemplate>
      <Toast message={hookError.error} />
    </>
  );
};

export default Root;

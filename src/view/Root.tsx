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

const Root = () => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <div>loading...</div>;

  if (error) return <div>Error</div>;

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
                <Project />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </MainTemplate>
    </>
  );
};

export default Root;

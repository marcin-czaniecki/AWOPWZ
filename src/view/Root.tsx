import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NoMatch from "view/pages/NoMatch/NoMatch";
import MainTemplate from "components/templates/MainTamplate/MainTamplate";
import { useToast } from "hooks/useToast";
import Toast from "components/organisms/Toast/Toast";
import Loading from "components/molecules/Loading/Loading";
import { views } from "./views";
import { auth } from "data/fb";

const Root = () => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();
  const { message } = useToast();

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
          <Route path="/unauthorization" element={!user ? <Unauthorized /> : <Navigate to="/" state={{ from: location }} />} />
          {views.map((view) => {
            if (!view.path || !view.element) {
              return <NoMatch />;
            }
            return <Route path={view.path} element={view.element} />;
          })}
        </Routes>
        <Toast message={message} />
      </MainTemplate>
    </>
  );
};

export default Root;

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NoMatch from "view/pages/NoMatch/NoMatch";
import MainTemplate from "components/templates/MainTamplate/MainTamplate";
import { useToast } from "hooks/useToast";
import Toast from "components/organisms/Toast/Toast";
import { views } from "./views";

import { useUser } from "hooks/useUser";
import Loading from "components/molecules/Loading/Loading";

const WaitingOnVerification = () => {
  const location = useLocation();
  const { currentUser, dataUser } = useUser();

  if (dataUser?.verifiedByAdmin === true && currentUser) {
    return <Navigate to={localStorage.getItem("lastPath") || views[0].path} state={{ from: location }} />;
  }

  if (!currentUser) {
    return <Navigate to="/unauthorization" state={{ from: location }} />;
  }

  if (!dataUser) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Musisz poczekać na weryfikacje od administratora.</h1>
    </div>
  );
};

const Root = () => {
  const { currentUser } = useUser();
  const location = useLocation();
  const { message, type } = useToast();

  if (location.pathname !== "/" && location.pathname !== "/unauthorization") {
    localStorage.setItem("lastPath", location.pathname);
  }

  return (
    <>
      <MainTemplate>
        <Routes>
          <Route index element={<WaitingOnVerification />} />
          <Route path="/unauthorization" element={!currentUser ? <Unauthorized /> : <Navigate to="/" state={{ from: location }} />} />
          {views.map((view) => (
            <Route key={view.path + Root.name} path={view.path} element={view.element} />
          ))}
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <Toast message={message} type={type} />
      </MainTemplate>
    </>
  );
};

export default Root;

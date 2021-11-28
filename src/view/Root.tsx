import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NoMatch from "view/pages/NoMatch/NoMatch";
import { views } from "./views";

import { useUser } from "hooks/useUser";
import Anteroom from "./pages/Anteroom/Anteroom";

const Root = () => {
  const { currentUser } = useUser();
  const location = useLocation();

  if (location.pathname !== "/" && location.pathname !== "/unauthorization") {
    localStorage.setItem("lastPath", location.pathname);
  }

  return (
    <Routes>
      <Route index element={<Anteroom />} />
      <Route path="/unauthorization" element={!currentUser ? <Unauthorized /> : <Navigate to="/" state={{ from: location }} />} />
      {views.map((view) => (
        <Route key={view.path} {...view} />
      ))}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default Root;

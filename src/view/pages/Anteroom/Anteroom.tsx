import { useUser } from "hooks/useUser";
import { useLocation, Navigate } from "react-router-dom";
import { views } from "view/views";

const Anteroom = () => {
  const location = useLocation();
  const { dataUser } = useUser();
  const isPermission = dataUser?.verifiedByAdmin === true;

  if (isPermission) {
    return (
      <Navigate to={localStorage.getItem("lastPath") || views[0].path} state={{ from: location }} />
    );
  }

  return (
    <div>
      <h1>Musisz poczekać na weryfikacje od administratora.</h1>
    </div>
  );
};

export default Anteroom;

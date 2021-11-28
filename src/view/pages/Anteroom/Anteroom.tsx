import Loading from "components/molecules/Loading/Loading";
import { useUser } from "hooks/useUser";
import { useLocation, Navigate } from "react-router-dom";
import { views } from "view/views";

const Anteroom = () => {
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

export default Anteroom;

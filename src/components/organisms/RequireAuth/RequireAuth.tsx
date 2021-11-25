import { useLocation, Navigate } from "react-router-dom";
import { useUser } from "hooks/useUser";

const RequireAuth = ({ children }: { children: any }) => {
  let location = useLocation();
  const { currentUser, dataUser } = useUser();

  if (!currentUser) {
    return <Navigate to="/unauthorization" state={{ from: location }} />;
  }
  if (dataUser?.verifiedByAdmin === true) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} />;
};

export default RequireAuth;

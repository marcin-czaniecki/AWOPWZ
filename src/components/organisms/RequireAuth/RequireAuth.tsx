import Loading from "components/molecules/Loading/Loading";
import fb, { auth, store } from "data/fb";
import { useToast } from "hooks/useToast";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: any }) => {
  let location = useLocation();
  const { setToast } = useToast();
  const [dataUser, loading, error] = useDocumentData(fb.doc(store, "users", auth?.currentUser?.uid || "unknown"));

  useEffect(() => {
    return () => {
      if (dataUser?.verifiedByAdmin === false) {
        setToast(`Nie zostałeś zatwierdzony przez administratora :/`);
      }
    };
  }, [setToast, dataUser?.verifiedByAdmin]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (dataUser?.verifiedByAdmin === false) {
    fb.signOut(auth);
  }

  if (!auth?.currentUser) {
    return <Navigate to="/unauthorization" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

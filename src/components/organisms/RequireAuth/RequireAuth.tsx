import fb, { auth, store } from "data/fb";
import { useError } from "hooks/useError";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: any }) => {
  let location = useLocation();
  let [user] = useAuthState(auth);
  const [, setError] = useError();
  const [uid, setUid] = useState("unknown");
  const [dataUser] = useDocumentDataOnce(fb.doc(store, "users", uid));

  useEffect(() => {
    if (user?.uid) {
      setUid(user.uid);
    }
    return () => {
      setUid("unknown");
    };
  }, [user, dataUser]);

  if (dataUser?.verifiedByAdmin === false) {
    fb.signOut(auth);
    setError(`Nie zostałeś zatwierdzony przez administratora :/`);
  }

  if (!user) {
    return <Navigate to="/unauthorization" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

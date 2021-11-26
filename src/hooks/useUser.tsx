import { auth } from "data/fb";
import StoreService from "data/StoreService";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { IUser } from "types/types";
import { EnumCollectionsName } from "utils/utils";

interface IGlobalUser {
  currentUser?: User | null;
  dataUser?: IUser | null;
}

const {
  sync: { docWithType },
} = StoreService;

export const UserContext = createContext<IGlobalUser>({});

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [currentUser] = useAuthState(auth);
  const [docRef, setDocRef] = useState(docWithType<IUser>(EnumCollectionsName.USERS, `${currentUser?.uid}`));
  const [dataUser] = useDocumentData<IUser>(docRef);

  useEffect(() => {
    if (currentUser?.uid) {
      setDocRef(docWithType<IUser>(EnumCollectionsName.USERS, currentUser.uid));
    }
  }, [currentUser, dataUser]);

  return <UserContext.Provider value={{ dataUser, currentUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const User = useContext(UserContext);
  if (!User) {
    throw Error("useUser needs to be inside inside UserProvider");
  }
  return User;
};

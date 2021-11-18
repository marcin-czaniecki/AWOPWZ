import fb, { auth, store } from "data/fb";
import { DocumentReference } from "firebase/firestore";
import { createContext, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { IUser } from "types/types";

export const UserContext = createContext<IUser | null>(null);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [data] = useDocumentData<IUser>(
    fb.doc(store, "users", auth?.currentUser?.uid || "unknown") as DocumentReference<IUser>
  );

  return <UserContext.Provider value={{ ...data } as IUser}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw Error("useProject needs to be inside inside ProjectProvider");
  }
  return user;
};

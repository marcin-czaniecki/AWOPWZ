import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { IPermissions } from "types/types";
import { useUser } from "./useUser";

export const CurrentUserPermissionsContext = createContext<[IPermissions | null]>([null]);

export const CurrentUserPermissionsProvider = ({
  children,
  id,
}: {
  id?: string;
  children: JSX.Element | JSX.Element[];
}) => {
  const { dataUser } = useUser();
  const params = useParams();
  const teamId = id || params?.id;
  const currentUserPermissions = dataUser?.permissions.find((team) => team.id === teamId);
  return (
    <CurrentUserPermissionsContext.Provider value={[currentUserPermissions || null]}>
      {children}
    </CurrentUserPermissionsContext.Provider>
  );
};

export const useCurrentUserPermissions = () => {
  const CurrentUserPermissions = useContext(CurrentUserPermissionsContext);
  if (!CurrentUserPermissions) {
    throw Error(
      "useCurrentUserPermissions needs to be inside inside CurrentUserPermissionsProvider"
    );
  }
  return CurrentUserPermissions;
};

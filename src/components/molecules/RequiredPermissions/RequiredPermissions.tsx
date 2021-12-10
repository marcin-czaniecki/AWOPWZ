import { useState, useEffect } from "react";
import { IRequiredPermissionsProps } from "types/componentTypes";

const RequiredPermissions = ({ booleanPermissions, children }: IRequiredPermissionsProps) => {
  const [isPermission, setIsPermission] = useState(false);
  useEffect(() => {
    booleanPermissions.forEach((value) => {
      if (value === true) {
        setIsPermission(value);
      }
    });
  }, [booleanPermissions]);
  return <>{isPermission && <>{children}</>}</>;
};

export default RequiredPermissions;

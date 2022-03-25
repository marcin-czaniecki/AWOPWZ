import Input from "components/atoms/Input/Input";
import TeamService from "fb/TeamService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { IFieldUserWithPermissionProps } from "types/componentTypes";
import { ErrorMessage } from "utils/utils";
import { WrapperFieldUser } from "./FieldUserWithPermission.styles";

const FieldUserWithPermission = ({
  children,
  updatedUserUid,
  fieldValue,
  value,
  permissions,
}: IFieldUserWithPermissionProps) => {
  const { setToast } = useToast();
  const { dataUser } = useUser();
  const [currentUserPermissions] = useCurrentUserPermissions();

  const updatePermission = async () => {
    if (!dataUser?.isAdmin) {
      if (fieldValue === "isLeader") {
        setToast(ErrorMessage.haventPermissions, "info");
        return;
      }
      const isLeaderPermission =
        !currentUserPermissions?.isLeader || permissions?.isLeader;
      const isServiceMemberPermission =
        !currentUserPermissions?.canServiceMember ||
        permissions?.isLeader ||
        fieldValue === "canServiceMember";
      if (isLeaderPermission && isServiceMemberPermission) {
        setToast(ErrorMessage.haventPermissions, "info");
        return;
      }
    }
    TeamService.updateMemberPermissions(
      updatedUserUid,
      fieldValue,
      typeof value === "boolean" ? !value : true,
      permissions
    );
  };
  return (
    <WrapperFieldUser>
      <div>{children}</div>
      <div>
        <Input checked={value} type="checkbox" onChange={updatePermission} />
      </div>
    </WrapperFieldUser>
  );
};

export default FieldUserWithPermission;

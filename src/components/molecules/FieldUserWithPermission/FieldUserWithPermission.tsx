import Input from "components/atoms/Input/Input";
import StoreService from "data/StoreService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import styled from "styled-components";
import { IPermissions } from "types/types";
import { ArrayName, CollectionsName } from "utils/utils";

interface IFieldUserWithPermissionProps {
  isPermission?: boolean;
  children: string;
  updatedUserUid: string;
  fieldValue: string;
  value?: boolean;
  permissions: IPermissions;
}

const WrapperFieldUser = styled.div`
  display: grid;
  background-color: rgba(0, 0, 0, 0.1);
  width: 280px;
  grid-template-columns: 1fr 0.1fr;
  justify-content: center;
  align-items: center;
`;

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
        setToast("Nie posiadasz odpowiednich uprawnień.", "info");
        return null;
      }
      const isLeaderPermission = !currentUserPermissions?.isLeader || permissions?.isLeader;
      const isPermissionCanServiceMember =
        !currentUserPermissions?.canServiceMember ||
        permissions?.isLeader ||
        fieldValue === "canServiceMember";
      if (isLeaderPermission && isPermissionCanServiceMember) {
        setToast("Nie posiadasz odpowiednich uprawnień.", "info");
        return null;
      }
    }

    await StoreService.updateArray(
      ArrayName.teams,
      [permissions],
      [{ ...permissions, [fieldValue]: typeof value === "boolean" ? !value : true }],
      await StoreService.doc(CollectionsName.users, updatedUserUid)
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

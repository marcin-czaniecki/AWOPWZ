import Button from "components/atoms/Button/Button";
import RequiredPermissions from "components/molecules/RequiredPermissions/RequiredPermissions";
import TeamService from "firebase/TeamService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useUser } from "hooks/useUser";
import styled from "styled-components";
import { IUser } from "types/types";

interface IUserWithPermissions {
  user: IUser;
  teamId: string;
}

const WrapperUserWithoutPermission = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  gap: 10px;
`;

const UserWithoutPermission = ({ teamId, user }: IUserWithPermissions) => {
  const { dataUser } = useUser();

  const permissions = user.teams.find((team) => team.id === teamId);
  const [currentUserPermissions] = useCurrentUserPermissions();

  if (permissions || (!currentUserPermissions && !dataUser?.isAdmin)) return null;

  const isPermissionsForAddMember = [
    currentUserPermissions?.isLeader || false,
    currentUserPermissions?.canServiceMember || false,
    dataUser?.isAdmin || false,
  ];
  return (
    <WrapperUserWithoutPermission>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>{user.profession}</div>
      <div>
        <RequiredPermissions booleanPermissions={isPermissionsForAddMember}>
          <Button onClick={() => TeamService.addMember(user.uid, teamId)}>Dodaj do zespołu</Button>
        </RequiredPermissions>
      </div>
    </WrapperUserWithoutPermission>
  );
};

export default UserWithoutPermission;

import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import FieldUserWithPermission from "components/molecules/FieldUserWithPermission/FieldUserWithPermission";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import Loading from "components/molecules/Loading/Loading";
import RequiredPermissions from "components/molecules/RequiredPermissions/RequiredPermissions";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { useParams } from "react-router-dom";
import { theme } from "theme/theme";
import { IUser } from "types/types";
import { arrayFieldUser, ConfirmModalButtonText } from "utils/utils";
import TeamService from "firebase/TeamService";
import {
  WrapperTeamMemberDetails,
  TeamMemberDetailsFirstPlan,
  WrapperTeamMemberDetailsPermission,
} from "./TeamMember.styles";

const TeamMember = ({ user }: { user: IUser }) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const [currentUserPermissions] = useCurrentUserPermissions();
  const params = useParams();
  const id = params?.id;

  const permissions = user.permissions.find((team) => team.id === id);
  if (!permissions) return null;

  if (!id) {
    return <Loading />;
  }

  const removeTeamMember = () => {
    if (!permissions) {
      return null;
    }
    const { isLeader, canServiceMember } = permissions;
    if (!dataUser?.isAdmin) {
      const isLeaderPermission = !currentUserPermissions?.isLeader || isLeader;
      const isPermissionServiceMember =
        !currentUserPermissions?.canServiceMember || isLeader || canServiceMember;
      if (isLeaderPermission && isPermissionServiceMember) {
        setToast("Nie posiadasz odpowiednich uprawnień.", "info");
        return null;
      }
    }

    TeamService.removeMember(user.uid, id, permissions);

    setToast("Usunałeś członka zespołu");
  };

  return (
    <WrapperTeamMemberDetails>
      <TeamMemberDetailsFirstPlan>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.profession}</div>
      </TeamMemberDetailsFirstPlan>
      <RequiredPermissions
        booleanPermissions={[
          currentUserPermissions?.isLeader || false,
          currentUserPermissions?.canServiceMember || false,
          dataUser?.isAdmin || false,
        ]}
      >
        <>
          <KebabMenu color={theme.color.primary}>
            <div>
              <ConfirmModal textButton="Zmień uprawnienia" maxHeight="210px" invisibleNo>
                <WrapperTeamMemberDetailsPermission>
                  <b>Uprawnienia</b>
                  {arrayFieldUser.map(({ key, content }) => {
                    return (
                      <FieldUserWithPermission
                        key={key + content}
                        permissions={permissions}
                        updatedUserUid={user.uid}
                        fieldValue={key}
                        value={permissions[key]}
                      >
                        {content}
                      </FieldUserWithPermission>
                    );
                  })}
                </WrapperTeamMemberDetailsPermission>
              </ConfirmModal>
            </div>
            <div>
              <ConfirmModal
                textButton={ConfirmModalButtonText.delete}
                maxHeight="110px"
                confirmAction={removeTeamMember}
              >
                <p>Czy napewno chcesz usunąć członka zespołu?</p>
              </ConfirmModal>
            </div>
          </KebabMenu>
        </>
      </RequiredPermissions>
    </WrapperTeamMemberDetails>
  );
};

export default TeamMember;

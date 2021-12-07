import { DocumentReference, where } from "@firebase/firestore";
import FieldUserWithPermission from "components/molecules/FieldUserWithPermission/FieldUserWithPermission";
import Loading from "components/molecules/Loading/Loading";
import ProjectCard from "components/organisms/ProjectCard/ProjectCard";
import StoreService from "data/StoreService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import useDocumentsWithCustomQuery from "hooks/useDocumentsWithCustomQuery";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { ReactChild, useEffect, useState } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { IPermissions, IProject, ITeam, IUser } from "types/types";
import { collectionReferenceProjects, collectionReferenceUsers } from "utils/references";
import { arrayFieldUser, ArrayName, CollectionsName } from "utils/utils";
import NoMatch from "../NoMatch/NoMatch";

const createPermission = (id: string) => ({
  id,
  isLeader: false,
  canServiceMember: false,
  canServiceProjects: false,
  canServiceColumns: false,
  canServiceTasks: true,
});

const RequirePermissions = ({
  booleanPermissions,
  children,
}: {
  booleanPermissions: boolean[];
  children: ReactChild;
}) => {
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

const TeamUsers = ({ user, permissions }: { user: IUser; permissions: IPermissions }) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const [currentUserPermissions] = useCurrentUserPermissions();

  const params = useParams();
  const id = params?.id;
  if (!id) {
    return <Loading />;
  }

  return (
    <div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.profession}</div>
      <div>
        <div>Permissions</div>
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
      </div>
      <RequirePermissions
        booleanPermissions={[
          currentUserPermissions?.isLeader || false,
          currentUserPermissions?.canServiceMember || false,
          dataUser?.isAdmin || false,
        ]}
      >
        <button
          onClick={() => {
            if (!dataUser?.isAdmin) {
              const isLeaderPermission = !currentUserPermissions?.isLeader || permissions?.isLeader;
              const isPermissionCanServiceMember =
                !currentUserPermissions?.canServiceMember ||
                permissions?.isLeader ||
                permissions?.canServiceMember;
              if (isLeaderPermission && isPermissionCanServiceMember) {
                setToast("Nie posiadasz odpowiednich uprawnień.", "info");
                return null;
              }
            }

            const refUser = StoreService.sync.doc(CollectionsName.users, user.uid);
            const refTeam = StoreService.sync.doc(CollectionsName.teams, id);
            StoreService.removeArrayElement(ArrayName.teams, [permissions], refUser);
            StoreService.removeArrayElement(ArrayName.members, [refUser], refTeam);
            setToast("Usunałeś członka zespołu");
          }}
        >
          Usuń z zespołu
        </button>
      </RequirePermissions>
      <span>======</span>
    </div>
  );
};

const UserWithoutPermission = ({ teamId, user }: { user: IUser; teamId: string }) => {
  const { dataUser } = useUser();

  const permissions = user.teams.find((team) => team.id === teamId);
  const [currentUserPermissions] = useCurrentUserPermissions();
  if (permissions || (!currentUserPermissions && !dataUser?.isAdmin)) return null;

  const addUserToTeam = () => {
    const refUser = StoreService.sync.doc(CollectionsName.users, user.uid);
    const refMebers = StoreService.sync.doc(CollectionsName.teams, teamId);

    StoreService.arrayPush(ArrayName.teams, createPermission(teamId), refUser);
    StoreService.arrayPush(ArrayName.members, refUser, refMebers);
  };
  const permissionsForAddUserToTeam = [
    currentUserPermissions?.isLeader || false,
    currentUserPermissions?.canServiceMember || false,
    dataUser?.isAdmin || false,
  ];
  return (
    <div style={{ display: "flex" }}>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <div>
        <RequirePermissions booleanPermissions={permissionsForAddUserToTeam}>
          <button onClick={addUserToTeam}>Dodaj do zespołu</button>
        </RequirePermissions>
      </div>
      <div></div>
    </div>
  );
};

const ElementListMember = ({ user, teamId }: { user: IUser; teamId: string }) => {
  const permissions = user.teams.find((team) => team.id === teamId);
  if (!permissions) return null;

  return <TeamUsers key={user.uid} permissions={permissions} user={user} />;
};

const Team = () => {
  const [currentUserPermissions] = useCurrentUserPermissions();
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const params = useParams();
  const teamId = params?.id;

  const projectQueryConstraint = where("teamId", "==", params?.id || "unknown");
  const [projects, loadingProjects, errorProjects] = useDocumentsWithCustomQuery(
    collectionReferenceProjects,
    projectQueryConstraint
  );

  const [users, loadingUsers, errorUsers] = useCollectionData<IUser>(collectionReferenceUsers);

  const doc = StoreService.sync.doc(
    CollectionsName.teams,
    params?.id || "unknown"
  ) as DocumentReference<ITeam>;
  const [team, loadingTeam, errorTeam] = useDocumentData<ITeam>(doc);

  if (loadingProjects || loadingTeam || loadingUsers) {
    return <Loading />;
  }

  const isError = errorUsers || errorTeam || errorProjects;
  const isPermissions = !currentUserPermissions && !dataUser?.isAdmin;
  const isTeam = !team || !teamId;

  if (isError || isPermissions || isTeam) {
    setToast("Coś poszło nie tak.");
    return <NoMatch />;
  }

  return (
    <>
      <div>Zespół {team?.name}</div>
      <div>
        {users?.map((user) => (
          <ElementListMember key={user.uid} user={user} teamId={teamId} />
        ))}
      </div>
      <div>
        {users?.map((user) => (
          <UserWithoutPermission key={user.uid} user={user} teamId={teamId} />
        ))}
      </div>
      <div>
        <div>Projekty tego zespołu</div>
        <div>
          {projects.map((doc) => {
            const data = doc.data() as IProject;
            return <ProjectCard key={doc.id} id={doc.id} {...data} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Team;

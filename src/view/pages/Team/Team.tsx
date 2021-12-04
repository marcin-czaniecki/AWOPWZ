import { CollectionReference, DocumentReference, where } from "@firebase/firestore";
import Input from "components/atoms/Input/Input";
import Loading from "components/molecules/Loading/Loading";
import ProjectCard from "components/organisms/ProjectCard/ProjectCard";
import StoreService from "data/StoreService";
import useDocumentsWithCustomQuery from "hooks/useDocumentsWithCustomQuery";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { IProject, ITeam, ITeamUser, IUser, TypeToast } from "types/types";
import { collectionReferenceProjects, collectionReferenceUsers } from "utils/references";
import { ArrayName, CollectionsName } from "utils/utils";

const FieldUser = ({
  onlyAdmin,
  children,
  updatedUserUid,
  fieldValue,
  value,
  permissions,
}: {
  onlyAdmin?: boolean;
  children: string;
  updatedUserUid: string;
  fieldValue: string;
  value?: boolean;
  permissions: ITeamUser;
}) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  return (
    <div
      style={{
        backgroundColor: "red",
        display: "grid",
        width: "300px",
        gridTemplateColumns: "1fr 0.1fr",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>{children}</div>
      <div>
        <Input
          checked={value}
          type="checkbox"
          onChange={async () => {
            const isPermission = onlyAdmin
              ? !dataUser?.isAdmin
              : !(!dataUser?.isAdmin || !permissions.isLeader);

            if (isPermission) {
              setToast("Nie posiadasz odpowiednich uprawnień.", "info");
              return;
            } else {
              await StoreService.updateArray(
                ArrayName.teams,
                [permissions],
                [{ ...permissions, [fieldValue]: typeof value === "boolean" ? !value : true }],
                await StoreService.doc(CollectionsName.users, updatedUserUid)
              );
            }
          }}
        />
      </div>
    </div>
  );
};

const TeamUsers = () => {};

enum PermissionsName {
  isLeader = "isLeader",
  canServiceMember = "canServiceMember",
  canServiceProjects = "canServiceProjects",
  canServiceColumns = "canServiceColumns",
  canServiceTasks = "canServiceTasks",
}

const Team = () => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const params = useParams();

  const [projects, loadingProject, errorProject] = useDocumentsWithCustomQuery(
    collectionReferenceProjects as CollectionReference<IProject>,
    where("teamId", "==", params?.id || "unknown")
  );

  const [users, loadingUsers, errorUsers] = useCollectionData<IUser>(collectionReferenceUsers);

  const doc = StoreService.sync.doc(
    CollectionsName.teams,
    params?.id || "unknown"
  ) as DocumentReference<ITeam>;
  const [team, loadingTeam, errorTeam] = useDocumentData<ITeam>(doc);

  if (loadingUsers || loadingTeam || loadingProject) {
    return <Loading />;
  }

  if (errorUsers || errorTeam || errorProject) {
    setToast(`Niestety poszło coś nie tak. Spróbuj ponnownie później.`);
    return <div>Error</div>;
  }

  return (
    <div>
      <div>Zespół {team?.name}</div>
      <div>
        {users?.map((user) => {
          const permissions = user.teams.find((team) => team.id === params?.id);
          const yourPermissions = dataUser?.teams.find((team) => team.id === params?.id);
          if (!permissions || (!yourPermissions && !dataUser?.isAdmin)) return null;

          return (
            <div key={user.uid}>
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div>{user.profession}</div>
              <div>
                <div>Permissions</div>
                <FieldUser
                  onlyAdmin
                  permissions={permissions}
                  updatedUserUid={user.uid}
                  fieldValue={PermissionsName.isLeader}
                  value={permissions[PermissionsName.isLeader]}
                >
                  Lider zespołu:
                </FieldUser>
                <FieldUser
                  permissions={permissions}
                  updatedUserUid={user.uid}
                  fieldValue={PermissionsName.canServiceMember}
                  value={permissions[PermissionsName.canServiceMember]}
                >
                  Może zarządzać użytkownikami?:
                </FieldUser>
                <FieldUser
                  permissions={permissions}
                  updatedUserUid={user.uid}
                  fieldValue={PermissionsName.canServiceProjects}
                  value={permissions[PermissionsName.canServiceProjects]}
                >
                  Może zarządzać projektami?:
                </FieldUser>
                <FieldUser
                  permissions={permissions}
                  updatedUserUid={user.uid}
                  fieldValue={PermissionsName.canServiceColumns}
                  value={permissions[PermissionsName.canServiceColumns]}
                >
                  Może zarządzać kolumnami projektu?:
                </FieldUser>
                <FieldUser
                  permissions={permissions}
                  updatedUserUid={user.uid}
                  fieldValue={PermissionsName.canServiceTasks}
                  value={permissions[PermissionsName.canServiceTasks]}
                >
                  Może zarządać zadaniami projektu?:
                </FieldUser>
              </div>
              <span>======</span>
            </div>
          );
        })}
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
    </div>
  );
};

export default Team;

import { CollectionReference, DocumentReference, where } from "@firebase/firestore";
import Input from "components/atoms/Input/Input";
import Loading from "components/molecules/Loading/Loading";
import ProjectCard from "components/organisms/ProjectCard/ProjectCard";
import StoreService from "data/StoreService";
import useDocumentsWithCustomQuery from "hooks/useDocumentsWithCustomQuery";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { ReactChild, useEffect, useState } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IProject, ITeam, IPermissions, IUser } from "types/types";
import { collectionReferenceProjects, collectionReferenceUsers } from "utils/references";
import { ArrayName, CollectionsName } from "utils/utils";

interface IPermissionName {
  isLeader: "isLeader";
  canServiceMember: "canServiceMember";
  canServiceProjects: "canServiceProjects";
  canServiceColumns: "canServiceColumns";
  canServiceTasks: "canServiceTasks";
}

const createPermission = (id: string) => ({
  id,
  isLeader: false,
  canServiceMember: false,
  canServiceProjects: false,
  canServiceColumns: false,
  canServiceTasks: true,
});

enum PermissionsName {
  isLeader = "isLeader",
  canServiceMember = "canServiceMember",
  canServiceProjects = "canServiceProjects",
  canServiceColumns = "canServiceColumns",
  canServiceTasks = "canServiceTasks",
}

const arrayFieldUser: {
  content: string;
  key:
    | "isLeader"
    | "canServiceMember"
    | "canServiceProjects"
    | "canServiceColumns"
    | "canServiceTasks";
}[] = [
  { content: "Lider zespołu:", key: "isLeader" },
  { content: "Może zarządzać użytkownikami?:", key: "canServiceMember" },
  { content: "Może zarządzać projektami?:", key: "canServiceProjects" },
  { content: "Może zarządzać kolumnami projektu?:", key: "canServiceColumns" },
  { content: "Może zarządać zadaniami projektu?:", key: "canServiceTasks" },
];

interface IFieldUserProps {
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

const FieldUser = ({
  isPermission,
  children,
  updatedUserUid,
  fieldValue,
  value,
  permissions,
}: IFieldUserProps) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  return (
    <WrapperFieldUser>
      <div>{children}</div>
      <div>
        <Input
          checked={value}
          type="checkbox"
          onChange={async () => {
            if (isPermission || dataUser?.isAdmin) {
              await StoreService.updateArray(
                ArrayName.teams,
                [permissions],
                [{ ...permissions, [fieldValue]: typeof value === "boolean" ? !value : true }],
                await StoreService.doc(CollectionsName.users, updatedUserUid)
              );
            } else {
              setToast("Nie posiadasz odpowiednich uprawnień.", "info");
            }
          }}
        />
      </div>
    </WrapperFieldUser>
  );
};

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

const TeamUsers = ({
  user,
  permissions,
  currentUserPermissions,
}: {
  user: IUser;
  permissions: IPermissions;
  currentUserPermissions?: IPermissions;
}) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
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
        {arrayFieldUser.map(({ key, content }) => (
          <FieldUser
            permissions={permissions}
            updatedUserUid={user.uid}
            fieldValue={key}
            value={permissions[key]}
          >
            {content}
          </FieldUser>
        ))}
      </div>
      {user.uid !== dataUser?.uid && (
        <RequirePermissions
          booleanPermissions={[
            currentUserPermissions?.isLeader || false,
            currentUserPermissions?.canServiceMember || false,
            dataUser?.isAdmin || false,
          ]}
        >
          <button
            onClick={() => {
              if (permissions.isLeader) {
                if (!dataUser?.isAdmin) {
                  setToast("Nie masz uprawnień");
                  return;
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
      )}
      <span>======</span>
    </div>
  );
};

const Team = () => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const params = useParams();
  const id = params?.id;

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

  if (loadingProject || loadingTeam || loadingUsers || !id) {
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
          const currentUserPermissions = dataUser?.teams.find((team) => team.id === params?.id);
          if (!permissions || (!currentUserPermissions && !dataUser?.isAdmin)) return null;

          return (
            <TeamUsers
              key={user.uid}
              currentUserPermissions={currentUserPermissions}
              permissions={permissions}
              user={user}
            />
          );
        })}
      </div>
      <div>
        {users?.map((user) => {
          const permissions = user.teams.find((team) => team.id === params?.id);
          const currentUserPermissions = dataUser?.teams.find((team) => team.id === params?.id);
          if (permissions || (!currentUserPermissions && !dataUser?.isAdmin)) return null;

          return (
            <div style={{ display: "flex" }}>
              <div>
                {user.firstName} {user.lastName}
              </div>
              <div>
                <RequirePermissions
                  booleanPermissions={[
                    currentUserPermissions?.isLeader || false,
                    currentUserPermissions?.canServiceMember || false,
                    dataUser?.isAdmin || false,
                  ]}
                >
                  <button
                    onClick={() => {
                      const refUser = StoreService.sync.doc(CollectionsName.users, user.uid);
                      StoreService.arrayPush(ArrayName.teams, createPermission(id), refUser);
                      StoreService.arrayPush(
                        ArrayName.members,
                        refUser,
                        StoreService.sync.doc(CollectionsName.teams, id)
                      );
                    }}
                  >
                    Dodaj do zespołu
                  </button>
                </RequirePermissions>
              </div>
              <div></div>
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

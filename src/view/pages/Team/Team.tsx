import { where } from "@firebase/firestore";
import AdditionBar from "components/molecules/AdditionBar/AdditionBar";
import ErrorData from "components/molecules/ErrorData/ErrorData";
import List from "components/molecules/List/List";
import Loading from "components/molecules/Loading/Loading";
import ProjectCard from "components/organisms/ProjectCard/ProjectCard";
import TeamMember from "components/organisms/TeamMember/TeamMember";
import UserWithoutPermission from "components/organisms/UserWithoutPermission/UserWithoutPermission";
import MashTemplate from "components/templates/MashTemplate/MashTemplate";
import StoreService from "fb/StoreService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import useDocumentsWithCustomQuery from "hooks/useDocumentsWithCustomQuery";
import { useUser } from "hooks/useUser";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IProject, ITeam, IUser } from "types/types";
import {
  collectionReferenceProjects,
  collectionReferenceUsers,
} from "utils/references";
import { CollectionsName } from "utils/utils";

const WrapperListUserWithoutPermission = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 80vh;
  overflow-y: scroll;
`;

const Team = () => {
  const [currentUserPermissions] = useCurrentUserPermissions();
  const { dataUser } = useUser();
  const params = useParams();
  const teamId = params?.id || "unknown";

  const projectQueryConstraint = where("teamId", "==", teamId);

  const [projects, loadingProjects, errorProjects] =
    useDocumentsWithCustomQuery(
      collectionReferenceProjects,
      projectQueryConstraint
    );
  const [users, loadingUsers, errorUsers] = useCollectionData<IUser>(
    collectionReferenceUsers
  );

  const doc = StoreService.docWithType<ITeam>(CollectionsName.teams, teamId);
  const [team, loadingTeam, errorTeam] = useDocumentData<ITeam>(doc);

  if (loadingProjects || loadingTeam || loadingUsers) {
    return <Loading />;
  }
  const isError = errorUsers || errorTeam || errorProjects;
  const isPermissions = !currentUserPermissions && !dataUser?.isAdmin;
  const isTeam = !team || !teamId;

  if (isError || isPermissions || isTeam) {
    return <ErrorData />;
  }
  const isServiceMemberPermissions =
    currentUserPermissions?.isLeader ||
    currentUserPermissions?.canServiceMember ||
    dataUser?.isAdmin;
  return (
    <>
      <div>Zespół {team?.name}</div>
      <MashTemplate>
        <>
          {users?.map((user) => (
            <TeamMember key={user.uid} user={user} />
          ))}
        </>
      </MashTemplate>
      {isServiceMemberPermissions && (
        <AdditionBar right>
          <>
            <h3>Dodaj użytkownika</h3>
            <List
              WrapperList={WrapperListUserWithoutPermission}
              array={users || []}
              callbackfn={(user) => (
                <UserWithoutPermission
                  key={user.uid}
                  user={user}
                  teamId={teamId}
                />
              )}
            />
          </>
        </AdditionBar>
      )}
      <div>
        <div>Projekty tego zespołu</div>
        <MashTemplate>
          {projects.map((doc) => {
            const data = doc.data() as IProject;
            return <ProjectCard key={doc.id} id={doc.id} {...data} />;
          })}
        </MashTemplate>
      </div>
    </>
  );
};

export default Team;

import Instruction from "components/molecules/Instruction/Instruction";
import Loading from "components/molecules/Loading/Loading";
import ProjectBoard from "components/organisms/ProjectBoard/ProjectBoard";
import { ProjectHeaderForDashboard } from "components/organisms/ProjectHeaderForDashboard/ProjectHeaderForDashboard";
import { DocumentReference } from "firebase/firestore";
import { ProjectProvider } from "hooks/useProject";
import { useUser } from "hooks/useUser";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { IProject } from "types/types";
import { instructionPinProject } from "utils/instructions";

const Dashboard = () => {
  const { dataUser } = useUser();
  const [pinnedProject, setPinnedProject] = useState<{
    name: string;
    ref: DocumentReference<IProject>;
  } | null>(null);
  const [project, loading, error] = useDocumentData(pinnedProject?.ref);

  useEffect(() => {
    if (dataUser?.pinnedProjects && dataUser.pinnedProjects.length && pinnedProject === null) {
      setPinnedProject(dataUser.pinnedProjects[0]);
    }
  }, [dataUser?.pinnedProjects, pinnedProject]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!dataUser?.pinnedProjects || !dataUser?.pinnedProjects.length) {
    return <Instruction {...instructionPinProject} />;
  }

  return (
    <div style={{ display: "grid" }}>
      <h1>Dzień dobry {dataUser?.firstName}</h1>
      <>
        {project && pinnedProject && pinnedProject.ref && (
          <ProjectProvider id={pinnedProject.ref.id}>
            <>
              <ProjectHeaderForDashboard
                pinnedProject={pinnedProject}
                setPinnedProject={setPinnedProject}
              />
              {dataUser?.permissions.find((team) => team.id === project?.teamId) ? (
                <ProjectBoard />
              ) : (
                <div>Utraciłeś dostęp do tego projektu.</div>
              )}
            </>
          </ProjectProvider>
        )}
      </>
    </div>
  );
};

export default Dashboard;

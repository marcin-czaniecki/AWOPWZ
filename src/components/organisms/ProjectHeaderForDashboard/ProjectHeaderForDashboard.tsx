import Button from "components/atoms/Button/Button";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import StoreService from "data/StoreService";
import { useUser } from "hooks/useUser";
import styled from "styled-components";
import { IProjectHeaderProps } from "types/componentTypes";
import { ArrayName, CollectionsName } from "utils/utils";

const {
  removeArrayElement,
  sync: { doc },
} = StoreService;

export const WrapperProjectHeader = styled.div`
  display: flex;
  padding: 7px 10px;
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.background};
  margin-bottom: 10px;
`;

export const ProjectHeaderForDashboard = ({ pinnedProject, setPinnedProject }: IProjectHeaderProps) => {
  const { dataUser } = useUser();

  const unpinProject = () => {
    if (dataUser && dataUser.pinnedProjects) {
      removeArrayElement(ArrayName.PINNED_PROJECTS, [pinnedProject], doc(CollectionsName.USERS, dataUser.uid));
      setPinnedProject(dataUser.pinnedProjects[0] || null);
    }
  };

  return (
    <WrapperProjectHeader>
      <div>{pinnedProject?.name}</div>
      <KebabMenu>
        <>
          {dataUser?.pinnedProjects?.map((pinnedProject) => (
            <div key={pinnedProject.name}>
              <Button onClick={() => setPinnedProject(pinnedProject)}>{pinnedProject.name}</Button>
            </div>
          ))}
        </>
        <ConfirmModal textButton={`Odepnij ${pinnedProject?.name}`} confirmAction={unpinProject}>
          <p>Po tej akcji nie będziesz widzieć tego projektu w Dashboard</p>
        </ConfirmModal>
      </KebabMenu>
    </WrapperProjectHeader>
  );
};

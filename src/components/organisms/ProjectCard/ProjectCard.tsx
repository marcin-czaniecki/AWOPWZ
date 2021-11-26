import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import StoreService from "data/StoreService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { Link } from "react-router-dom";
import { theme } from "theme/theme";
import { EnumCollectionsName, EnumNameOfProjectArrays } from "utils/utils";
import FormProject from "../ProjectForm/ProjectForm";
import { WrapperProjectCard, WrapperContentProjectCard } from "./ProjectCard.styles";

const { removeDoc, doc, arrayPush, removeArrayElement } = StoreService;

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  const { setToast } = useToast();
  const { currentUser } = useUser();
  const projectRemove = async () => {
    try {
      removeDoc(await doc(EnumCollectionsName.PROJECTS, id));
      if (currentUser) {
        removeArrayElement(
          EnumNameOfProjectArrays.PINNED_PROJECTS,
          [{ name: name, ref: await doc(EnumCollectionsName.PROJECTS, id) }],
          await doc(EnumCollectionsName.USERS, currentUser.uid)
        );
      }
    } catch (error) {
      setToast("Niestety nie możesz usunąć tego projektu.");
    }
  };

  return (
    <WrapperProjectCard>
      <KebabMenu color={theme.color.primary}>
        <ConfirmModal textButton="Usuń" confirmAction={projectRemove} maxHeight="110px">
          <p>Czy na pewno chcesz usunąć projekt</p>
        </ConfirmModal>
        <ConfirmModal textButton="Edytuj" maxHeight="120px" invisibleYes invisibleNo>
          <FormProject id={id} />
        </ConfirmModal>
        <ConfirmModal
          textButton="Przypnij"
          maxHeight="120px"
          confirmAction={async () => {
            console.log(currentUser);

            if (currentUser) {
              arrayPush(
                EnumNameOfProjectArrays.PINNED_PROJECTS,
                { name: name, ref: await doc(EnumCollectionsName.PROJECTS, id) },
                await doc(EnumCollectionsName.USERS, currentUser.uid)
              );
            }
          }}
        >
          <p>Czy na pewno chcesz przypiąć ten projekt?</p>
        </ConfirmModal>
      </KebabMenu>
      <Link to={`/projects/${id}`} style={{ textDecoration: "none" }}>
        <WrapperContentProjectCard key={id}>{name}</WrapperContentProjectCard>
      </Link>
    </WrapperProjectCard>
  );
};
export default ProjectCard;

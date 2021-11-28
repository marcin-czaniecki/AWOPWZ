import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import StoreService from "data/StoreService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { Link } from "react-router-dom";
import { theme } from "theme/theme";
import { ArrayName, CollectionsName } from "utils/utils";
import FormProject from "../ProjectForm/ProjectForm";
import { WrapperContentProjectCard, WrapperProjectCard } from "./ProjectCard.styles";

const { removeDoc, doc, arrayPush, removeArrayElement } = StoreService;

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  const { setToast } = useToast();
  const { currentUser } = useUser();
  const projectRemove = async () => {
    try {
      await removeDoc(await doc(CollectionsName.PROJECTS, id));
      if (currentUser) {
        await removeArrayElement(
          ArrayName.PINNED_PROJECTS,
          [{ name: name, ref: await doc(CollectionsName.PROJECTS, id) }],
          await doc(CollectionsName.USERS, currentUser.uid)
        );
      } else {
        setToast("Musisz być zalogowany.");
      }
    } catch (error: any) {
      setToast("Niestety nie możesz usunąć tego projektu.");
    }
  };

  const pinProject = async () => {
    try {
      if (currentUser) {
        await arrayPush(
          ArrayName.PINNED_PROJECTS,
          { name: name, ref: await doc(CollectionsName.PROJECTS, id) },
          await doc(CollectionsName.USERS, currentUser.uid)
        );
      } else {
        setToast("Musisz być zalogowany.");
      }
    } catch (error: any) {
      setToast("Nie możesz przypiąć tego projektu.");
    }
  };

  return (
    <WrapperProjectCard>
      <KebabMenu color={theme.color.primary}>
        <ConfirmModal textButton="Usuń" maxHeight="110px" confirmAction={projectRemove}>
          <p>Czy na pewno chcesz usunąć projekt</p>
        </ConfirmModal>
        <ConfirmModal textButton="Edytuj" maxHeight="120px" invisibleYes invisibleNo>
          <FormProject id={id} />
        </ConfirmModal>
        <ConfirmModal textButton="Przypnij" maxHeight="110px" confirmAction={pinProject}>
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

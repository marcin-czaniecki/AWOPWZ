import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import StoreService from "data/StoreService";
import { useToast } from "hooks/useToast";
import { Link } from "react-router-dom";
import { theme } from "theme/theme";
import { EnumCollectionsName } from "utils/utils";
import FormProject from "../ProjectForm/ProjectForm";
import { WrapperProjectCard, WrapperContentProjectCard } from "./ProjectCard.styles";

const { removeDoc, doc } = StoreService;

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  const { setToast } = useToast();

  const projectRemove = async () => {
    try {
      removeDoc(await doc(EnumCollectionsName.PROJECTS, id));
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
      </KebabMenu>
      <Link to={`${id}`} style={{ textDecoration: "none" }}>
        <WrapperContentProjectCard key={id}>{name}</WrapperContentProjectCard>
      </Link>
    </WrapperProjectCard>
  );
};
export default ProjectCard;

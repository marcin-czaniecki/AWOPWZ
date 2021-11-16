import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import fb from "data/fb";
import { useError } from "hooks/useError";
import { Link } from "react-router-dom";
import { getDocumentReferenceProject } from "utils/firebaseUtils";
import FormProject from "../FormProject/FormProject";
import { WrapperProjectCard, WrapperContentProjectCard } from "./ProjectCard.styles";

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  const { setError } = useError();

  const projectRemove = async () => {
    try {
      fb.deleteDoc(getDocumentReferenceProject(id));
    } catch (error) {
      setError("Z jakiegoś powodu nie udało się usunąć projektu");
    }
  };

  return (
    <WrapperProjectCard>
      <ConfirmModal confirmAction={projectRemove} textButton="Usuń" buttonVersion="secondary">
        <p>Czy na pewno chcesz usunąć projekt</p>
      </ConfirmModal>
      <ConfirmModal textButton="Zmień nazwę" buttonVersion="secondary" maxHeight="120px" invisibleYes invisibleNo>
        <FormProject id={id} />
      </ConfirmModal>
      <Link to={`${id}`} style={{ textDecoration: "none" }}>
        <WrapperContentProjectCard key={id}>{name}</WrapperContentProjectCard>
      </Link>
    </WrapperProjectCard>
  );
};
export default ProjectCard;

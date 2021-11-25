import Form from "components/molecules/Form/Form";
import fb from "data/fb";
import { useToast } from "hooks/useToast";
import { useForm, SubmitHandler } from "react-hook-form";
import { getDocumentReferenceProject, collectionReferenceProjects } from "utils/references";
import { enumName } from "utils/utils";

type Inputs = {
  name: string;
};

const Fields = [{ name: "name", type: "text", label: "Nazwa projektu" }];

const ProjectForm = ({ id }: { id?: string }) => {
  const { reset } = useForm<Inputs>();
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
    try {
      if (id) {
        await fb.updateDoc(getDocumentReferenceProject(id), { name });
      } else {
        const data = { name, [enumName.COLUMNS]: [], [enumName.TASKS]: [] };
        await fb.addDoc(collectionReferenceProjects, data);
      }
      reset();
    } catch (error) {
      setToast("Coś poszło nie tak :c");
    }
  };

  return (
    <>
      <Form fields={Fields} onSubmit={onSubmit} />
    </>
  );
};

export default ProjectForm;

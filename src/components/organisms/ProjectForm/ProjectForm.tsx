import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb from "data/fb";
import { useToast } from "hooks/useToast";
import { useForm, SubmitHandler } from "react-hook-form";
import { getDocumentReferenceProject, collectionReferenceProjects } from "utils/references";
import { enumName } from "utils/utils";
import { WrapperFormProject } from "./ProjectForm.styles";

type Inputs = {
  name: string;
};

const ProjectForm = ({ id }: { id?: string }) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
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
      <WrapperFormProject onSubmit={handleSubmit(onSubmit)}>
        <FiledInput name="name" type="text" label={"Nazwa projektu"} register={register} />
        <Button>{id ? "Zmień nazwę" : "Dodaj projekt"}</Button>
      </WrapperFormProject>
    </>
  );
};

export default ProjectForm;

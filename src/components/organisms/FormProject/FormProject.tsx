import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb from "data/fb";
import { useError } from "hooks/useError";
import { useForm, SubmitHandler } from "react-hook-form";
import { getDocumentReferenceProject, collectionReferenceProject } from "utils/firebaseUtils";
import { enumName } from "utils/utils";
import { WrapperFormProject } from "./FormProject.styles";

type Inputs = {
  name: string;
};

const FormProject = ({ id }: { id?: string }) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { setError } = useError();
  const onSubmit: SubmitHandler<Inputs> = ({ name }) => {
    (async () => {
      try {
        if (id) {
          const data = {
            name: name,
          };
          await fb.updateDoc(getDocumentReferenceProject(id), data);
        } else {
          const data = { name: name, [enumName.COLUMNS]: [], [enumName.TASKS]: [] };
          await fb.addDoc(collectionReferenceProject, data);
        }
        reset();
      } catch (error) {
        setError("Coś poszło nie tak :c");
      }
    })();
  };
  return (
    <>
      <WrapperFormProject onSubmit={handleSubmit(onSubmit)}>
        <FiledInput name="name" label={"Nazwa projektu"}>
          <Input type="text" {...register("name", { required: true })} />
        </FiledInput>
        <Button>{id ? "Zmień nazwę" : "Dodaj projekt"}</Button>
      </WrapperFormProject>
    </>
  );
};

export default FormProject;

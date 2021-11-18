import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb, { store, auth } from "data/fb";
import { DocumentReference } from "firebase/firestore";
import { useToast } from "hooks/useToast";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUser } from "types/types";
import { enumName } from "utils/utils";

type Inputs = {
  firstName?: string;
  lastName?: string;
  profession?: string;
};

const ProfileForm = ({ user }: { user: Inputs }) => {
  const { setToast } = useToast();
  const doc = fb.doc(store, enumName.USERS, auth?.currentUser?.uid || "unknown") as DocumentReference<IUser>;
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fb.updateDoc(doc, {
      ...data,
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          let errorMessage = "Musisz podać swoje ";
          if (errors.firstName) {
            errorMessage += "imie, ";
          }
          if (errors.lastName) {
            errorMessage += "nazwisko, ";
          }
          if (errors.profession) {
            errorMessage += "stanowisko.";
          }
          if (errors) {
            setToast(errorMessage);
          }
        })}
      >
        <FiledInput name="firstName" label="Podaj swoje imie">
          <Input type="text" defaultValue={user.firstName || ""} {...register("firstName", { required: true })} />
        </FiledInput>
        <FiledInput name="lastName" label="Podaj swoje Nazwisko">
          <Input type="text" defaultValue={user.lastName || ""} {...register("lastName", { required: true })} />
        </FiledInput>
        <FiledInput name="profession" label="Podaj swój zawód/stanowisko">
          <Input type="text" defaultValue={user.profession || ""} {...register("profession", { required: true })} />
        </FiledInput>
        <Button>Aktualizuj profil</Button>
      </form>
    </>
  );
};

export default ProfileForm;

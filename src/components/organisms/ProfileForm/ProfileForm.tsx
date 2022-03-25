import Form from "components/organisms/Form/Form";
import StoreService from "fb/StoreService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { SubmitHandler } from "react-hook-form";
import { CollectionsName } from "utils/utils";

const { updateDoc, doc } = StoreService;

type Inputs = {
  firstName?: string;
  lastName?: string;
  profession?: string;
};

const ProfileForm = ({ user }: { user: { [key: string]: string } }) => {
  const { setToast } = useToast();
  const { currentUser } = useUser();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (currentUser) {
        await updateDoc(data, doc(CollectionsName.users, currentUser?.uid));
      } else {
        setToast("Musisz być zalogowany!");
      }
    } catch (error: any) {
      setToast(error.message);
    }
  };

  return (
    <>
      <Form
        fields={[
          {
            name: "firstName",
            type: "text",
            label: "Podaj swoje imię",
            defaultValue: user["firstName"],
          },
          {
            name: "lastName",
            type: "text",
            label: "Podaj swoje Nazwisko",
            defaultValue: user["lastName"],
          },
          {
            name: "profession",
            type: "text",
            label: "Podaj swój zawód/stanowisko",
            defaultValue: user["profession"],
          },
        ]}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ProfileForm;

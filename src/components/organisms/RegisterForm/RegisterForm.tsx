import { useToast } from "hooks/useToast";
import { SubmitHandler } from "react-hook-form";
import AuthService from "fb/AuthService";
import Form from "components/organisms/Form/Form";
import StoreService from "fb/StoreService";
import { ArrayName, CollectionsName } from "utils/utils";

const { setDoc, doc } = StoreService;

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  profession: string;
};

const Fields = [
  { name: "email", type: "email", label: "Twój email" },
  {
    name: "password",
    type: "password",
    label: "Twoje hasło",
    options: { required: true, minLength: 8 },
  },
  {
    name: "repeatPassword",
    type: "password",
    label: "Powtórz swoje hasło",
    options: { required: true, minLength: 8 },
  },
  { name: "firstName", type: "text", label: "Podaj swoje imię" },
  { name: "lastName", type: "text", label: "Podaj swoje Nazwisko" },
  { name: "profession", type: "text", label: "Podaj swój zawód/stanowisko" },
];

const RegisterForm = () => {
  const { setToast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.repeatPassword) {
      setToast("Wpisane hasła muszą być takie same ;c");
      return;
    }
    try {
      const { uid } = await AuthService.createUser(data.email, data.password);
      setDoc(
        {
          uid: uid,
          verifiedByAdmin: false,
          isAdmin: false,
          firstName: data.firstName,
          lastName: data.lastName,
          profession: data.profession,
          [ArrayName.permissions]: [],
          [ArrayName.pinnedProjects]: [],
        },
        doc(CollectionsName.users, uid)
      );
      setToast(`Założyłeś nowe konto :D`);
    } catch (e: any) {
      setToast(e.message, "warning");
    }
  };

  return (
    <Form
      contentButton="Zarejestruj mnie"
      fields={Fields}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;

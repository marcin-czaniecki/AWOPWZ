import { useToast } from "hooks/useToast";
import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb, { auth, store } from "data/fb";
import { SubmitHandler, useForm } from "react-hook-form";
import { enumName } from "utils/utils";

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
  firstName?: string;
  lastName?: string;
  profession?: string;
};

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (data.password !== data.repeatPassword) {
        setToast("Wpisane hasła muszą być takie same ;c");
        return;
      }
      const { user } = await fb.createUserWithEmailAndPassword(auth, data.email, data.password);
      const { uid } = user;
      await fb.setDoc(fb.doc(store, enumName.USERS, uid), {
        uid: uid,
        verifiedByAdmin: false,
        isAdmin: false,
        firstName: data.firstName,
        lastName: data.lastName,
        profession: data.profession,
      });
      setToast(`Założyłeś nowe konto :D`);
    } catch (e) {
      setToast("Coś poszło nie tak spróbuj ponnownie z innymi danymi");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        const { email, password, repeatPassword } = errors;
        if (email) {
          if (email.type === "required") {
            setToast(`Pole "Twój email" jest wymagane!`);
          }
        }
        if (password) {
          if (password.type === "required") {
            setToast(`Pole "Twoje hasło" jest wymagane!`);
          }
        }
        if (repeatPassword) {
          if (repeatPassword.type === "required") {
            setToast(`Pole "Powtórz swoje hasło" jest wymagane!`);
          }
        }
      })}
    >
      <FiledInput name="email" type="email" register={register} label="Twój email" />
      <FiledInput name="password" type="password" register={register} label="Twoje hasło" options={{ required: true, minLength: 8 }} />
      <FiledInput
        name="password"
        type="password"
        register={register}
        label="Powtórz swoje hasło"
        options={{ required: true, minLength: 8 }}
      />
      <FiledInput name="firstName" type="text" register={register} label="Podaj swoje imie" />
      <FiledInput name="lastName" type="text" register={register} label="Podaj swoje Nazwisko" />
      <FiledInput name="profession" type="text" register={register} label="Podaj swój zawód/stanowisko" />
      <Button type="submit">Rejestruj</Button>
    </form>
  );
};

export default RegisterForm;

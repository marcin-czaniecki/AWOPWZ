import { useError } from "hooks/useError";
import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb, { auth, store } from "data/fb";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "components/atoms/Input/Input";
import { enumName } from "utils/utils";

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { setError } = useError();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password !== data.repeatPassword) {
      setError("Wpisane hasła muszą być takie same ;c");
      return;
    }
    (async () => {
      try {
        const { user } = await fb.createUserWithEmailAndPassword(auth, data.email, data.password);
        const { uid } = user;
        await fb.setDoc(fb.doc(store, enumName.USERS, uid), {
          uid: uid,
          verifiedByAdmin: false,
          isAdmin: false,
        });
        setError(`Założyłeś nowe konto :D`);
      } catch (e) {
        setError("Coś poszło nie tak spróbuj ponnownie z innymi danymi");
      }
    })();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        const { email, password, repeatPassword } = errors;
        if (email) {
          if (email.type === "required") {
            setError(`Pole "Twój email" jest wymagane!`);
          }
        }
        if (password) {
          if (password.type === "required") {
            setError(`Pole "Twoje hasło" jest wymagane!`);
          }
        }
        if (repeatPassword) {
          if (repeatPassword.type === "required") {
            setError(`Pole "Powtórz swoje hasło" jest wymagane!`);
          }
        }
      })}
    >
      <FiledInput name="email" label="Twój email">
        <Input type="email" {...register("email", { required: true })} />
      </FiledInput>
      <FiledInput name="password" label="Twoje hasło">
        <Input type="password" {...register("password", { required: true, minLength: 8 })} />
      </FiledInput>
      <FiledInput name="password" label="Powtórz swoje hasło">
        <Input type="password" {...register("repeatPassword", { required: true, minLength: 8 })} />
      </FiledInput>
      <Button type="submit">Rejestruj</Button>
    </form>
  );
};

export default RegisterForm;

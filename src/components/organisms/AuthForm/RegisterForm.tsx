import { useError } from "hooks/useError";
import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb from "data/fb";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "components/atoms/Input/Input";

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [, setError] = useError();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password !== data.repeatPassword) {
      setError("Hasła nie są takie same");
      return;
    }
    (async () => {
      try {
        const { user } = await fb.createUserWithEmailAndPassword(fb.getAuth(), data.email, data.password);
        const { uid } = user;
        await fb.setDoc(fb.doc(fb.getFirestore(), "users", uid), {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FiledInput name="email" label="Twój email">
        <Input type="email" {...register("email", { required: true })} />
      </FiledInput>
      <FiledInput name="password" label="Twoje hasło">
        <Input type="password" {...register("password", { required: true })} />
      </FiledInput>
      <FiledInput name="password" label="Powtórz swoje hasło">
        <Input type="password" {...register("repeatPassword", { required: true })} />
      </FiledInput>
      <Button type="submit">Rejestruj</Button>
    </form>
  );
};

export default RegisterForm;

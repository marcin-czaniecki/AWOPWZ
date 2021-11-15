import { useError } from "hooks/useError";
import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb, { auth } from "data/fb";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "components/atoms/Input/Input";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [, setError] = useError();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    (async () => {
      try {
        await fb.signInWithEmailAndPassword(auth, data.email, data.password);
      } catch (e) {
        setError("Nieprawidłowy email lub hasło");
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
      <Button type="submit">Zaloguj</Button>
    </form>
  );
};

export default LoginForm;

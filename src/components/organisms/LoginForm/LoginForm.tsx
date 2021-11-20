import { useToast } from "hooks/useToast";
import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb, { auth } from "data/fb";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    (async () => {
      try {
        await fb.signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        setToast("Nieprawidłowy email lub hasło");
      }
    })();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FiledInput name="email" type="email" label="Twój email" register={register} options={{ required: true }} />
      <FiledInput name="password" type="password" label="Twoje hasło" register={register} options={{ required: true }} />
      <Button type="submit">Zaloguj</Button>
    </form>
  );
};

export default LoginForm;

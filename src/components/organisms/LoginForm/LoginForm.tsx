import { useToast } from "hooks/useToast";
import Button from "components/atoms/Button/Button";
import FieldInput from "components/molecules/FieldInput/FieldInput";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthService from "data/AuthService";

type Inputs = {
  email: string;
  password: string;
};

const Fields = [
  { name: "email", type: "email", label: "Twój email" },
  { name: "password", type: "password", label: "Twoje hasło" },
];

const LoginForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await AuthService.signIn(email, password);
    } catch (e: any) {
      setToast(e.message, "warning");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Fields.map((field) => (
        <FieldInput key={field.name + LoginForm.name} {...field} register={register} />
      ))}
      <Button type="submit">Zaloguj</Button>
    </form>
  );
};

export default LoginForm;

import Form from "components/organisms/Form/Form";
import AuthService from "firebase/AuthService";
import { useToast } from "hooks/useToast";
import { SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await AuthService.signIn(email, password);
    } catch (e: any) {
      setToast(e.message, "warning");
    }
  };
  return (
    <Form
      contentButton="Zaloguj mnie"
      fields={[
        { name: "email", type: "email", label: "Twój email" },
        { name: "password", type: "password", label: "Twoje hasło" },
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;

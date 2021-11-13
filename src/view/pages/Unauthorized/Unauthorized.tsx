import { useState } from "react";
import { useError } from "hooks/useError";
import AuthForm from "components/organisms/AuthForm/RegisterForm";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import Toast from "components/organisms/Toast/Toast";
import { WrapperUnauthorized, ControlButtons, ControlButton, WrapperForm } from "./Unauthorized.styles";

const Unauthorized = () => {
  const [register, setRegister] = useState(false);
  const [error] = useError();
  return (
    <>
      <WrapperUnauthorized>
        <ControlButtons>
          <ControlButton
            active={!register}
            onClick={() => {
              setRegister(false);
            }}
          >
            Zaloguj
          </ControlButton>
          <ControlButton
            active={register}
            onClick={() => {
              setRegister(true);
            }}
          >
            Zarejestruj
          </ControlButton>
        </ControlButtons>
        <WrapperForm>{register ? <AuthForm /> : <LoginForm />}</WrapperForm>
      </WrapperUnauthorized>
      <Toast message={error} />
    </>
  );
};

export default Unauthorized;

import { useState } from "react";
import AuthForm from "components/organisms/RegisterForm/RegisterForm";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import { WrapperUnauthorized, ControlButtons, ControlButton, WrapperForm } from "./Unauthorized.styles";

const Unauthorized = () => {
  const [register, setRegister] = useState(false);
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
            Logowanie
          </ControlButton>
          <ControlButton
            active={register}
            onClick={() => {
              setRegister(true);
            }}
          >
            Rejestracja
          </ControlButton>
        </ControlButtons>
        <WrapperForm>{register ? <AuthForm /> : <LoginForm />}</WrapperForm>
      </WrapperUnauthorized>
    </>
  );
};

export default Unauthorized;

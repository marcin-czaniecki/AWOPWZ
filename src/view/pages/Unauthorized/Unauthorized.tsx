import { useState } from "react";
import AuthForm from "components/organisms/RegisterForm/RegisterForm";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import {
  WrapperUnauthorized,
  ControlButtons,
  ControlButton,
  WrapperForm,
} from "./Unauthorized.styles";

const Unauthorized = () => {
  const [isVisibleRegister, setIsVisibleRegister] = useState(false);
  return (
    <>
      <WrapperUnauthorized>
        <ControlButtons>
          <ControlButton active={!isVisibleRegister} onClick={() => setIsVisibleRegister(false)}>
            Logowanie
          </ControlButton>
          <ControlButton active={isVisibleRegister} onClick={() => setIsVisibleRegister(true)}>
            Rejestracja
          </ControlButton>
        </ControlButtons>
        <WrapperForm>{isVisibleRegister ? <AuthForm /> : <LoginForm />}</WrapperForm>
      </WrapperUnauthorized>
    </>
  );
};

export default Unauthorized;

import { useState } from "react";
import { useError } from "hooks/useError";
import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import * as firebaseAuth from "firebase/auth";

const auth = firebaseAuth.getAuth();

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useError();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email && password) {
          (async () => {
            try {
              await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
            } catch (e) {
              setError("You give incorrect email or password");
            }
          })();
        }
      }}
    >
      <FiledInput label="Email" value={email} setValue={setEmail} name="email" type="email" placeholder="Your email" />
      <FiledInput
        label="Hasło"
        value={password}
        setValue={setPassword}
        name="password"
        type="password"
        placeholder="Your password"
      />
      <Button>Log in</Button>
    </form>
  );
};

export default LoginForm;

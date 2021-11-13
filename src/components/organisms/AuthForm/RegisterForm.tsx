import { useError } from "hooks/useError";
import { useState } from "react";
import Button from "components/atoms/Button/Button";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import fb from "data/fb";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [, setError] = useError();
  const [flags, setFlags] = useState({
    samePassword: false,
  });

  const registerNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFlags((s) => ({
      ...s,
      samePassword: password === repeatPassword,
    }));
    if (flags.samePassword) {
      (async () => {
        try {
          const { user } = await fb.createUserWithEmailAndPassword(fb.getAuth(), email, password);
          const { emailVerified, uid } = user;

          await fb.setDoc(fb.doc(fb.getFirestore(), "users", uid), {
            uid: uid,
            verifiedByAdmin: false,
            isAdmin: false,
          });
          setError(`Założyłeś nowe konto :D`);
          if (!emailVerified) {
            setError(`You can verified your email`);
          }
        } catch (e) {
          setError("Sorry something went wrong. You can try again");
        }
      })();
    } else {
      setError("You must give the same passwords");
    }
  };
  return (
    <form onSubmit={registerNewUser}>
      <FiledInput label="Email" value={email} setValue={setEmail} name="email" type="email" placeholder="Your email" />
      <FiledInput
        label="Hasło"
        value={password}
        setValue={setPassword}
        name="password1"
        type="password"
        placeholder="Your password"
      />
      <FiledInput
        label="Powtórz hasło"
        value={repeatPassword}
        setValue={setRepeatPassword}
        name="password"
        type="password"
        placeholder="Repeat your password"
      />
      <Button>Register</Button>
    </form>
  );
};

export default RegisterForm;

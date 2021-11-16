import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";
import fb, { auth, store } from "data/fb";
import { useError } from "hooks/useError";
import { useState } from "react";

const FooterChat = () => {
  const [value, setValue] = useState("");
  const { setError } = useError();

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      try {
        if (!auth.currentUser) {
          setError("You need to log in again!");
          return;
        }
        const { uid, email } = await auth.currentUser;
        const collectionRef = fb.collection(store, "message");
        const now = fb.Timestamp.now();
        const messageDoc = {
          uid: uid,
          author: email,
          content: value,
          createdAt: now,
          updatedAt: now,
        };
        await fb.addDoc(collectionRef, messageDoc);
        setValue("");
      } catch (e) {
        setError("You can't send message :/");
      }
    })();
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <Input type="text" value={value} onChange={({ currentTarget: { value } }) => setValue(value)} />
        <Button>Wyślij</Button>
      </form>
    </div>
  );
};

export default FooterChat;

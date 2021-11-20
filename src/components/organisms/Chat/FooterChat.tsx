import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";
import fb, { auth, store } from "data/fb";
import { useToast } from "hooks/useToast";
import { useState } from "react";
import { EnumCollectionsName } from "utils/utils";

const FooterChat = () => {
  const [value, setValue] = useState("");
  const { setToast } = useToast();

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (!auth.currentUser) {
        setToast("You need to log in again!");
        return;
      }
      const { uid, email } = auth.currentUser;
      const collectionRef = fb.collection(store, EnumCollectionsName.MESSAGES);
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
      setToast("You can't send message :/");
    }
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

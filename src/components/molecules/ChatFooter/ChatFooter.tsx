import StoreService from "data/StoreService";
import { Timestamp } from "firebase/firestore";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { SubmitHandler } from "react-hook-form";
import { EnumCollectionsName } from "utils/utils";
import Form from "../Form/Form";

const { collection, createDoc, setDoc, doc } = StoreService;

interface Inputs {
  message: string;
}

const FooterChat = ({ path }: { path: string }) => {
  const { currentUser } = useUser();
  const { setToast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async ({ message }) => {
    try {
      if (!currentUser) {
        return setToast("You need to log in again!");
      }
      const { uid, email } = currentUser;
      const now = Timestamp.now();
      const messageBody = {
        uid: uid,
        author: email,
        content: message,
        createdAt: now,
        updatedAt: now,
      };
      const docRef = await createDoc(messageBody, await collection(path));
      await setDoc({ uid: uid, messageRef: docRef }, await doc(EnumCollectionsName.MESSAGES, `ref${docRef.id}`));
    } catch (e) {
      setToast("You can't send message :/");
    }
  };

  return (
    <div>
      <Form contentButton="Wyślij" fields={[{ name: "message", type: "text", label: "", autoComplete: "off" }]} onSubmit={onSubmit} />
    </div>
  );
};

export default FooterChat;

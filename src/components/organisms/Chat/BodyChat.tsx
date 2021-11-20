import Loading from "components/molecules/Loading/Loading";
import Message from "components/molecules/Message/Message";
import fb, { store } from "data/fb";
import { useCollection } from "react-firebase-hooks/firestore";
import { IMessage } from "types/types";
import { EnumCollectionsName } from "utils/utils";
import { WrapperBodyChat } from "./Chat.styles";

const BodyChat = () => {
  const [value, loading, error] = useCollection(fb.collection(store, EnumCollectionsName.MESSAGES));

  if (loading) {
    return <Loading size="100px" />;
  }
  if (error) {
    return <div>...</div>;
  }

  return (
    <WrapperBodyChat>
      {value?.docs
        .sort((a, b) => {
          const message1 = a.data() as IMessage;
          const message2 = b.data() as IMessage;
          return message1.createdAt.seconds > message2.createdAt.seconds ? 1 : -1;
        })
        .map((value) => {
          const message = value.data() as IMessage;

          return <Message key={value.id} {...message} id={value.id} />;
        })}
    </WrapperBodyChat>
  );
};

export default BodyChat;

import Loading from "components/molecules/Loading/Loading";
import Message from "components/organisms/Message/Message";
import StoreService from "fb/StoreService";
import { useCollection } from "react-firebase-hooks/firestore";
import { IChatProps } from "types/componentTypes";
import { IMessage } from "types/types";
import ErrorData from "../../molecules/ErrorData/ErrorData";
import { WrapperChatBody } from "./ChatBody.styles";

const ChatBody = ({ path }: IChatProps) => {
  const [messages, loading, error] = useCollection(
    StoreService.collection(path)
  );

  if (loading) {
    return <Loading size="100px" />;
  }

  if (error) {
    return <ErrorData />;
  }

  return (
    <WrapperChatBody>
      {messages?.docs
        .sort((a, b) => {
          const message1 = a.data() as IMessage;
          const message2 = b.data() as IMessage;
          return message1.createdAt.seconds > message2.createdAt.seconds
            ? 1
            : -1;
        })
        .map((value) => {
          const message = value.data() as IMessage;
          return (
            <Message key={value.id} {...message} id={value.id} path={path} />
          );
        })}
    </WrapperChatBody>
  );
};

export default ChatBody;

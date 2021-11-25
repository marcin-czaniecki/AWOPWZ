import ChatBody from "components/molecules/ChatBody/ChatBody";
import ChatFooter from "components/molecules/ChatFooter/ChatFooter";
import { useParams } from "react-router-dom";
import { WrapperChat } from "./Chat.styles";

const Chat = ({ path }: { path: string }) => {
  const { id } = useParams();
  if (!id) {
    return <div>brak</div>;
  }
  return (
    <WrapperChat>
      <ChatBody path={path} />
      <ChatFooter path={path} />
    </WrapperChat>
  );
};

export default Chat;

import ChatBody from "components/molecules/ChatBody/ChatBody";
import ChatFooter from "components/molecules/ChatFooter/ChatFooter";
import { WrapperChat } from "./Chat.styles";

const Chat = ({ path }: { path: string }) => {
  return (
    <WrapperChat>
      <ChatBody path={path} />
      <ChatFooter path={path} />
    </WrapperChat>
  );
};

export default Chat;

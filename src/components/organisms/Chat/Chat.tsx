import ChatBody from "components/organisms/ChatBody/ChatBody";
import ChatFooter from "components/organisms/ChatFooter/ChatFooter";
import { IChatProps } from "types/componentTypes";
import { WrapperChat } from "./Chat.styles";

const Chat = ({ path }: IChatProps) => {
  return (
    <WrapperChat>
      <ChatBody path={path} />
      <ChatFooter path={path} />
    </WrapperChat>
  );
};

export default Chat;

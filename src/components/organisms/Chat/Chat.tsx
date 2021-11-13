import BodyChat from "./BodyChat";
import { WrapperChat } from "./Chat.styles";
import FooterChat from "./FooterChat";
import HeaderChat from "./HeaderChat";

const Chat = () => {
  return (
    <WrapperChat>
      <HeaderChat />
      <BodyChat />
      <FooterChat />
    </WrapperChat>
  );
};

export default Chat;

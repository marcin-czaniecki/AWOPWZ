import { useState } from "react";
import Button from "components/atoms/Button/Button";
import Chat from "components/organisms/Chat/Chat";
import { WrapperProjectChat, HiddenChatButton } from "./ProjectChat.styles";

const ProjectChat = ({ name, path }: { name: string; path: string }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <WrapperProjectChat visible={active}>
        <Button typeButton="close" onClick={() => setActive(false)} />
        <Chat path={path} />
      </WrapperProjectChat>
      <HiddenChatButton visible={active} onClick={() => setActive(true)}>
        {name} chat
      </HiddenChatButton>
    </>
  );
};

export default ProjectChat;

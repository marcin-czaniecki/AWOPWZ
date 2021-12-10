import Form from "components/organisms/Form/Form";
import ChatService from "firebase/ChatService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { SubmitHandler } from "react-hook-form";
import { IChatProps } from "types/componentTypes";
import { ErrorMessage } from "utils/utils";

interface Inputs {
  message: string;
}

const FooterChat = ({ path }: IChatProps) => {
  const { currentUser } = useUser();
  const { setToast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async ({ message }) => {
    try {
      if (!currentUser) {
        return setToast(ErrorMessage.noValue);
      }
      ChatService.createMessage(path, message, currentUser);
    } catch (e) {
      return setToast(ErrorMessage.default);
    }
  };

  return (
    <div>
      <Form
        contentButton="Wyślij"
        fields={[{ name: "message", type: "text", label: "", autoComplete: "off" }]}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FooterChat;

import DateField from "components/molecules/DateFIeld/DateField";
import ChatService from "fb/ChatService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { theme } from "theme/theme";
import { IMessageProps } from "types/componentTypes";
import ConfirmModal from "../../molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "../../molecules/KebabMenu/KebabMenu";
import {
  WrapperMessage,
  WrapperMessageContent,
  AuthorFiled,
  WrapperMessageBody,
} from "./Message.styles";

const Message = ({
  author,
  id,
  uid,
  content,
  createdAt,
  path,
}: IMessageProps) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const isCurrentUser = dataUser?.uid === uid;
  const isPermissions = isCurrentUser || dataUser?.isAdmin;

  const removeMessage = async () => {
    try {
      ChatService.removeMessage(path, id);
    } catch (error: any) {
      setToast(error.message);
    }
  };

  return (
    <WrapperMessage>
      <WrapperMessageBody isCurrentUser={isCurrentUser}>
        <div>
          <DateField dateAt={createdAt} />
        </div>
        <div>
          {!isCurrentUser && (
            <AuthorFiled autoMarginLeft={!isCurrentUser}>
              {author ? author : uid}
            </AuthorFiled>
          )}
          <WrapperMessageContent isCurrentUser={isCurrentUser}>
            {content}
          </WrapperMessageContent>
        </div>
      </WrapperMessageBody>
      {isPermissions && (
        <KebabMenu color={theme.color.text} top>
          <ConfirmModal
            textButton="usuń"
            maxHeight="110px"
            confirmAction={removeMessage}
          >
            <p>Czy na pewno chcesz usunąć tą wiadomość?</p>
          </ConfirmModal>
        </KebabMenu>
      )}
    </WrapperMessage>
  );
};

export default Message;

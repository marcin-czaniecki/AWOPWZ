import { printDate, addLeadingZero } from "@janossik/date";
import StoreService from "data/StoreService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { theme } from "theme/theme";
import { IMessageProps } from "types/componentTypes";
import { CollectionsName } from "utils/utils";
import ConfirmModal from "../../molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "../../molecules/KebabMenu/KebabMenu";
import {
  WrapperMessage,
  WrapperDataFiled,
  WrapperMessageContent,
  AuthorFiled,
  WrapperMessageBody,
} from "./Message.styles";

const { removeDoc, doc } = StoreService;

interface IDateFiledProps {
  previousText?: string;
  autoMarginLeft?: boolean;
  showCalendar?: boolean;
  dateAt: {
    toDate: () => Date;
    seconds: number;
  };
}

const DateFiled = ({
  previousText = "Wysłano:",
  dateAt,
  autoMarginLeft,
  showCalendar,
}: IDateFiledProps) => {
  const date = dateAt.toDate();
  const ddmmmyy = printDate("ddmmmyy", "pl", date);
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  return (
    <WrapperDataFiled autoMarginLeft={autoMarginLeft}>
      {showCalendar && `${previousText} ${ddmmmyy},`} {hours}:{minutes}
    </WrapperDataFiled>
  );
};

const Message = ({ author, id, uid, content, createdAt, path }: IMessageProps) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const isCurrentUser = dataUser?.uid === uid;
  const isPermissions = isCurrentUser || dataUser?.isAdmin;
  const removeMessage = async () => {
    try {
      await removeDoc(await doc(path, id));
      await removeDoc(await doc(CollectionsName.messages, `ref${id}`));
    } catch (error: any) {
      setToast(error.message);
    }
  };

  return (
    <WrapperMessage>
      <WrapperMessageBody isCurrentUser={isCurrentUser}>
        <div>
          <DateFiled dateAt={createdAt} />
        </div>
        <div>
          {!isCurrentUser && (
            <AuthorFiled autoMarginLeft={!isCurrentUser}>{author ? author : uid}</AuthorFiled>
          )}
          <WrapperMessageContent isCurrentUser={isCurrentUser}>{content}</WrapperMessageContent>
        </div>
      </WrapperMessageBody>
      {isPermissions && (
        <KebabMenu color={theme.color.text} top>
          <ConfirmModal textButton="usuń" maxHeight="110px" confirmAction={removeMessage}>
            <p>Czy na pewno chcesz usunąć tą wiadomość?</p>
          </ConfirmModal>
        </KebabMenu>
      )}
    </WrapperMessage>
  );
};

export default Message;

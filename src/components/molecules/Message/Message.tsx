import { printDate, addLeadingZero } from "@janossik/date";
import StoreService from "data/StoreService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { theme } from "theme/theme";
import { IMessageProps } from "types/componentTypes";
import { EnumCollectionsName } from "utils/utils";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import KebabMenu from "../KebabMenu/KebabMenu";
import { WrapperMessage, DataFiled, ContentMessage } from "./Message.styles";

const { removeDoc, doc } = StoreService;

const Message = ({ author, id, uid, content, createdAt, path }: IMessageProps) => {
  const { dataUser } = useUser();
  const isPermissions = dataUser?.uid === uid || dataUser?.isAdmin;
  const { setToast } = useToast();

  const removeMessage = async () => {
    try {
      await removeDoc(await doc(path, id));
      await removeDoc(await doc(EnumCollectionsName.MESSAGES, `ref${id}`));
    } catch (error: any) {
      setToast(error.message);
    }
  };

  return (
    <WrapperMessage>
      <DataFiled isI={dataUser?.uid !== uid}>{author ? author : uid}</DataFiled>
      <ContentMessage>{content}</ContentMessage>
      <DataFiled>
        Wysłano: {`${printDate("ddmmmyy", "pl", createdAt.toDate())},`}
        {` ${addLeadingZero(createdAt.toDate().getHours())}:${addLeadingZero(createdAt.toDate().getMinutes())}`}
      </DataFiled>
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

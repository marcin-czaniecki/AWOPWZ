import { printDate, addLeadingZero } from "@janossik/date";
import fb, { store, auth } from "data/fb";
import { useError } from "hooks/useError";
import { useState, useEffect } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { theme } from "theme/theme";
import { IMessage } from "types/types";
import { removeDoc } from "utils/firebaseUtils";
import { enumName } from "utils/utils";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import KebabMenu from "../KebabMenu/KebabMenu";
import { WrapperMessage, DataFiled, ContentMessage } from "./Message.styles";

const Message = ({ author, id, uid, content, createdAt, updatedAt }: IMessage) => {
  const { setError } = useError();
  const [uidC, setUidC] = useState("unknown");
  const [dUser] = useDocumentDataOnce(fb.doc(store, enumName.USERS, uidC));

  useEffect(() => {
    if (auth.currentUser?.uid) {
      setUidC(auth.currentUser.uid);
    }
    return () => {
      setUidC("unknown");
    };
  }, [dUser, setUidC]);

  const isPermissions = uidC === uid || dUser?.isAdmin;
  return (
    <WrapperMessage>
      <DataFiled isI={uidC !== uid}>{author ? author : uid}</DataFiled>
      <ContentMessage>{content}</ContentMessage>
      <DataFiled>
        Wysłano:
        {`${printDate("ddmmmyy", "pl", createdAt.toDate())},`}
        {` ${addLeadingZero(createdAt.toDate().getHours())}:${addLeadingZero(createdAt.toDate().getMinutes())}`}
      </DataFiled>
      <KebabMenu color={theme.color.text}>
        {isPermissions && (
          <ConfirmModal
            textButton="usuń"
            maxHeight="110px"
            confirmAction={() => removeDoc(enumName.MESSAGE, id, setError)}
          >
            <p>Czy na pewno chcesz usunąć tą wiadomość?</p>
          </ConfirmModal>
        )}
      </KebabMenu>
    </WrapperMessage>
  );
};

export default Message;

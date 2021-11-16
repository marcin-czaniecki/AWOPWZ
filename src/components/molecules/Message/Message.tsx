import { printDate, addLeadingZero } from "@janossik/date";
import Button from "components/atoms/Button/Button";
import fb, { store, auth } from "data/fb";
import { useError } from "hooks/useError";
import { useState, useEffect } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IMessage } from "types/types";
import { removeDoc } from "utils/firebaseUtils";
import { enumName } from "utils/utils";
import Modal from "../Modal/Modal";
import { WrapperMessage, DataFiled, ContentMessage } from "./Message.styles";

const WrapperMessageModalButtons = styled.div`
  display: flex;
  width: 50%;
  margin: 20px auto 0 auto;
  margin-top: auto;
  button {
    :first-child {
      margin-right: auto;
    }
  }
`;

const Message = ({ author, id, uid, content, createdAt, updatedAt }: IMessage) => {
  const { setError } = useError();
  const [visible, setVisible] = useState(false);
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

  const closeModal = () => {
    setVisible(false);
  };
  const openModal = () => {
    setVisible(true);
  };

  const isPermissions = uidC === uid || dUser?.isAdmin;
  return (
    <WrapperMessage>
      <DataFiled isI={uidC !== uid}>{author ? author : uid}</DataFiled>
      <ContentMessage>{content}</ContentMessage>
      <DataFiled>
        Wysłano:
        {`${printDate("ddmmmyy", "pl", createdAt.toDate())},`}
        {` ${addLeadingZero(createdAt.toDate().getHours())}:${addLeadingZero(createdAt.toDate().getMinutes())}`}
        {isPermissions && <Button onClick={openModal}>remove</Button>}
      </DataFiled>
      <Modal active={visible} maxWidth="300px" maxHeight="120px" closeAction={closeModal}>
        <div>
          <p>Czy na pewno chcesz usunąć tą wiadomość?</p>
          <WrapperMessageModalButtons>
            <Button onClick={() => removeDoc(enumName.MESSAGE, id, setError)}>tak</Button>
            <Button onClick={closeModal}>nie</Button>
          </WrapperMessageModalButtons>
        </div>
      </Modal>
    </WrapperMessage>
  );
};

export default Message;

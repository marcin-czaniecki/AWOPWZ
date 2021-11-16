import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import Loading from "components/molecules/Loading/Loading";
import ProfileForm from "components/organisms/ProfileForm/ProfileForm";
import fb, { auth, store } from "data/fb";
import { DocumentReference } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IUser } from "types/types";
import { enumName } from "utils/utils";

const WrapperProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    margin-right: auto;
  }
`;
const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Profile = () => {
  const doc = fb.doc(store, enumName.USERS, auth?.currentUser?.uid || "unknown") as DocumentReference<IUser>;
  const [data, loading, error] = useDocumentData<IUser>(doc);

  if (loading) {
    return <Loading />;
  }

  if (error || !auth.currentUser) {
    return <div>Error</div>;
  }

  return (
    <WrapperProfile>
      <WrapperInfo>
        <div>Email: {auth.currentUser.email}</div>
        <div>Imie: {data?.firstName || "Unknown"}</div>
        <div>Nazwisko: {data?.lastName || "Unknown"}</div>
        <div>Profesja: {data?.profession || "Uknown"}</div>
      </WrapperInfo>
      <ConfirmModal textButton="Edytuj" invisibleYes invisibleNo maxHeight="250px">
        <ProfileForm user={{ firstName: data?.firstName, lastName: data?.lastName, profession: data?.profession }} />
      </ConfirmModal>
    </WrapperProfile>
  );
};

export default Profile;

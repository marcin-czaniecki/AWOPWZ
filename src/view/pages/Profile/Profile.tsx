import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import ProfileForm from "components/organisms/ProfileForm/ProfileForm";
import { auth } from "data/fb";
import { useUser } from "hooks/useUser";
import styled from "styled-components";

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
  const data = useUser();

  if (!auth.currentUser) {
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

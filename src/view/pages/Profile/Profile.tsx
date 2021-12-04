import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import Loading from "components/molecules/Loading/Loading";
import FormModal from "components/organisms/FormModal/FormModal";
import ProfileForm from "components/organisms/ProfileForm/ProfileForm";
import AuthService from "data/AuthService";
import { useUser } from "hooks/useUser";
import { WrapperProfile, WrapperInfo } from "./Profile.styles";

const Profile = () => {
  const { currentUser, dataUser } = useUser();
  if (!dataUser || !currentUser) {
    return <Loading />;
  }
  const { email } = currentUser;
  const { firstName, lastName, profession } = dataUser;
  return (
    <WrapperProfile>
      <WrapperInfo>
        <div>Email: {email}</div>
        <div>Imię: {firstName || "Unknown"}</div>
        <div>Nazwisko: {lastName || "Unknown"}</div>
        <div>Profesja: {profession || "Uknown"}</div>
      </WrapperInfo>
      <FormModal textButton="Edytuj" maxHeight="250px">
        <ProfileForm
          user={{
            firstName: firstName || "",
            lastName: lastName || "",
            profession: profession || "",
          }}
        />
      </FormModal>
      <ConfirmModal
        textButton="Usuń konto"
        maxHeight="110px"
        confirmAction={() => currentUser && AuthService.removeAccount(currentUser)}
      >
        <p>Czy na pewno chcesz usunąć konto?</p>
      </ConfirmModal>
    </WrapperProfile>
  );
};

export default Profile;

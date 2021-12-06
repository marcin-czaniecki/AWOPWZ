import Input from "components/atoms/Input/Input";
import { store } from "data/fb";
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import styled from "styled-components";
import { IUser } from "types/types";
import { CollectionsName } from "utils/utils";

const WrapperUser = styled.div`
  display: flex;
  padding: 10px 20px;
  color: snow;
  background-color: ${({ theme }) => theme.color.primary};
  grid-template-columns: 1fr 0.2fr 1fr;
  gap: 20px;
`;
const handleVerifiedByAdmin = async (verifiedByAdmin: boolean, uid: string) => {
  const docRef = doc(store, CollectionsName.users, uid);
  try {
    await updateDoc(docRef, {
      verifiedByAdmin: typeof verifiedByAdmin === "boolean" ? !verifiedByAdmin : true,
    });
  } catch (e: any) {
    throw new Error("Nie udało się zweryfikować tego konta.");
  }
};
const UserCard = ({ uid, firstName, lastName, profession, verifiedByAdmin }: IUser & {}) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();

  return (
    <WrapperUser>
      <div>
        <div>
          {firstName || "unknown"} {lastName || "unknown"}
        </div>
        <div>{profession || "unknown"}</div>
      </div>
      <>
        <div>
          <label>Zweryfikowany</label>
          <Input
            checked={verifiedByAdmin}
            type="checkbox"
            onChange={async () => {
              if (dataUser?.isAdmin) {
                try {
                  await handleVerifiedByAdmin(verifiedByAdmin, uid);
                } catch (e: any) {
                  setToast(e.message);
                }
                return;
              }
              setToast("Weryfikacje może przeprowadzić tylko administrator");
            }}
          />
        </div>
      </>
    </WrapperUser>
  );
};
export default UserCard;

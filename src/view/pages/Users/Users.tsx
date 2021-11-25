import Loading from "components/molecules/Loading/Loading";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IUser } from "types/types";
import { collectionReferenceUsers } from "utils/references";
import Input from "components/atoms/Input/Input";
import { store } from "data/fb";
import { doc, updateDoc } from "firebase/firestore";
import { EnumCollectionsName } from "utils/utils";
import { useUser } from "hooks/useUser";
import { useToast } from "hooks/useToast";

const WrapperUser = styled.div`
  display: flex;
  padding: 10px 20px;
  color: snow;
  background-color: ${({ theme }) => theme.color.primary};
  grid-template-columns: 1fr 0.2fr 1fr;
  gap: 20px;
`;
const handleVerifiedByAdmin = async (uid: string) => {
  const docRef = doc(store, EnumCollectionsName.USERS, uid);
  try {
    await updateDoc(docRef, {
      verifiedByAdmin: true,
    });
  } catch (e: any) {
    throw new Error("Nie udało się zweryfikować tego konta.");
  }
};
const User = ({ uid, firstName, lastName, profession, verifiedByAdmin }: IUser) => {
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
      {dataUser?.isAdmin && (
        <>
          <div>
            <label>Zweryfikowany</label>
            <Input
              checked={verifiedByAdmin}
              type="checkbox"
              onChange={async () => {
                try {
                  await handleVerifiedByAdmin(uid);
                } catch (e: any) {
                  setToast(e.message);
                }
              }}
            />
          </div>
        </>
      )}
    </WrapperUser>
  );
};

const WrapperUsers = styled.div`
  display: grid;
  gap: 20px;
  @media screen and (min-width: ${({ theme }) => theme.screen.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: ${({ theme }) => theme.screen.laptop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: ${({ theme }) => theme.screen.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Users = () => {
  const [data, loading, error] = useCollectionData<IUser>(collectionReferenceUsers);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <WrapperUsers>
        {data?.map((user) => {
          return <User key={user.uid} {...user} />;
        })}
      </WrapperUsers>
    </div>
  );
};

export default Users;

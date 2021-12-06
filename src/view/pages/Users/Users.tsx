import Loading from "components/molecules/Loading/Loading";
import UserCard from "components/organisms/UserCard/UserCard";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IUser } from "types/types";
import { collectionReferenceUsers } from "utils/references";

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
          return <UserCard key={user.uid} {...user} />;
        })}
      </WrapperUsers>
    </div>
  );
};

export default Users;

import { Fragment } from "react";
import Loading from "components/molecules/Loading/Loading";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IUser } from "types/types";
import { collectionReferenceUsers } from "utils/references";

const WrapperUser = styled.div`
  display: grid;
  padding: 10px 20px;
  color: snow;
  background-color: ${({ theme }) => theme.color.primary};
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.color.secondary};
  }
`;

const User = ({ firstName, lastName, profession, verifiedByAdmin }: IUser) => {
  return (
    <WrapperUser onClick={() => {}}>
      <div>
        {firstName || "unknown"} {lastName || "unknown"}
      </div>
      <div>{profession || "unknown"}</div>
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
          return user.verifiedByAdmin ? <User key={user.uid} {...user} /> : <Fragment key={user.uid}></Fragment>;
        })}
      </WrapperUsers>
    </div>
  );
};

export default Users;

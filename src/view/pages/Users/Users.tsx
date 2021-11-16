import Loading from "components/molecules/Loading/Loading";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IUser } from "types/types";
import { collectionReferenceUsers } from "utils/firebaseUtils";

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
      {data?.map((user) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <div>Imie: {user.firstName || "unknown"}</div>
            <div>Nazwisko: {user.lastName || "unknown"}</div>
            <div>Stanowisko: {user.profession || "unknown"}</div>
            <div>Imie: {user.firstName || "unknown"}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;

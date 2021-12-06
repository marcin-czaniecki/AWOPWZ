import AdditionBar from "components/molecules/AdditionBar/AdditionBar";
import Card from "components/molecules/Card/Card";
import Loading from "components/molecules/Loading/Loading";
import Form from "components/organisms/Form/Form";
import StoreService from "data/StoreService";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { ITeam } from "types/types";
import { collectionReferenceTeams } from "utils/references";
import { ArrayName, CollectionsName } from "utils/utils";

const WrapperListTeams = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: clamp(300px, 100%, 1300px);
  margin: 0 auto;
  justify-content: center;
  gap: 20px;
`;

const Fields = [{ name: "name", type: "text", label: "Nazwa zespołu" }];

type Inputs = {
  name: string;
};

const TeamsForm = ({ id }: { id?: string }) => {
  const { dataUser } = useUser();
  const { setToast } = useToast();
  const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
    if (!dataUser?.isAdmin) {
      setToast("Musisz być administratorem.");
    }
    try {
      if (id) {
      } else {
        if (!dataUser?.uid) {
          setToast("Wyszła niezgodność z twoim kontem, musisz skontaktować się z administratorem!");
          return;
        }
        const data = {
          name,
          author: dataUser?.uid,
          projects: [],
          members: [
            {
              ref: await StoreService.doc(CollectionsName.users, dataUser?.uid),
            },
          ],
        };

        const doc = await StoreService.createDoc(
          data,
          await StoreService.collection(CollectionsName.teams)
        );

        StoreService.arrayPush(
          ArrayName.teams,
          {
            id: doc.id,
            canServiceTasks: true,
            canServiceColumns: true,
            canServiceProjects: true,
            canServiceMember: true,
            isLeader: true,
          },
          await StoreService.doc(CollectionsName.users, dataUser?.uid)
        );
      }
    } catch (error) {
      setToast("Coś poszło nie tak :c");
    }
  };

  return (
    <>
      <Form
        fields={Fields}
        onSubmit={onSubmit}
        contentButton={id ? "Zmień nazwę zespołu" : "Dodaj zespół"}
      />
    </>
  );
};

const Teams = () => {
  const { dataUser } = useUser();
  const [value, loading, error] = useCollection(collectionReferenceTeams);
  if (loading) {
    return <Loading />;
  }
  if (error || !dataUser) {
    return <div>error</div>;
  }
  return (
    <>
      {dataUser?.isAdmin && (
        <AdditionBar right>
          <TeamsForm />
        </AdditionBar>
      )}
      <WrapperListTeams>
        {value?.docs.map((doc) => {
          const findTeam = dataUser.teams.find((userTeam) => userTeam.id === doc.id);
          if (!findTeam && !dataUser.isAdmin) return null;
          const team = doc.data() as ITeam;
          return (
            <Card key={doc.id} to={`/teams/${doc.id}`} kebabMenuChildren={<div></div>}>
              {team.name}
            </Card>
          );
        })}
      </WrapperListTeams>
    </>
  );
};

export default Teams;

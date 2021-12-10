import { getDoc } from "@firebase/firestore";
import Card from "components/molecules/Card/Card";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import TeamService from "firebase/TeamService";
import { useToast } from "hooks/useToast";
import { ITeamCardProps } from "types/componentTypes";
import { IUser } from "types/types";
import { ErrorMessage, ConfirmModalButtonText } from "utils/utils";
import FormModal from "../FormModal/FormModal";
import TeamsForm from "../TeamsForm/TeamsForm";

const TeamCard = ({ name, teamId, members }: ITeamCardProps) => {
  const { setToast } = useToast();

  const fullRemoveTeam = () => {
    TeamService.removeTeam(teamId);
    members.forEach(async (docUser) => {
      try {
        const res = await getDoc(docUser);
        const member = res.data() as IUser;
        const permissions = member.teams.find((permission) => {
          return permission.id === teamId;
        });
        if (permissions) {
          TeamService.removeMemberPermissions(docUser.id, permissions);
        } else {
          setToast(ErrorMessage.default);
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Card
      key={teamId}
      to={`/teams/${teamId}`}
      kebabMenuChildren={
        <>
          <ConfirmModal
            textButton={ConfirmModalButtonText.delete}
            maxHeight="110px"
            confirmAction={fullRemoveTeam}
          >
            <p>Czy na pewno chcesz usunąć zespół</p>
          </ConfirmModal>
          <FormModal textButton={ConfirmModalButtonText.edit} maxHeight="160px">
            <TeamsForm id={teamId} />
          </FormModal>
        </>
      }
    >
      {name}
    </Card>
  );
};

export default TeamCard;

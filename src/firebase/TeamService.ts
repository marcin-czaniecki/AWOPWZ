import { DocumentReference } from "@firebase/firestore";
import { IPermissions, IUser } from "types/types";
import { CollectionsName, ArrayName } from "utils/utils";
import StoreService from "./StoreService";

interface IUpdateTeamData {
  members?: Array<DocumentReference<IUser>>;
  name?: string;
  author?: string;
}

class TeamService {
  static async createTeam(name: string, uid: string) {
    const initData = {
      name,
      author: uid,
      members: [StoreService.doc(CollectionsName.users, uid)],
    };
    const doc = await StoreService.createDoc(
      initData,
      StoreService.collection(CollectionsName.teams)
    );
    const permissions = {
      id: doc.id,
      canServiceTasks: true,
      canServiceColumns: true,
      canServiceProjects: true,
      canServiceMember: true,
      isLeader: true,
    };
    StoreService.arrayPush(
      ArrayName.permissions,
      permissions,
      StoreService.doc(CollectionsName.users, uid)
    );
  }
  static async updateTeam(data: IUpdateTeamData, teamId: string) {
    return await StoreService.updateDoc<IUpdateTeamData>(
      data,
      StoreService.doc(CollectionsName.teams, teamId)
    );
  }
  static async removeTeam(teamId: string) {
    StoreService.removeDoc(StoreService.doc(CollectionsName.teams, teamId));
  }
  static removeMember(uid: string, teamId: string, permissions: IPermissions) {
    const refUser = StoreService.doc(CollectionsName.users, uid);
    const refTeam = StoreService.doc(CollectionsName.teams, teamId);
    this.removeMemberPermissions(uid, permissions);
    StoreService.removeArrayElement(ArrayName.members, [refUser], refTeam);
  }
  static removeMemberPermissions(uid: string, permissions: IPermissions) {
    const refUser = StoreService.doc(CollectionsName.users, uid);
    StoreService.removeArrayElement(ArrayName.permissions, [permissions], refUser);
  }
  static updateMemberPermissions(
    updatedUserUid: string,
    fieldValue: string,
    value: boolean,
    permissions: IPermissions
  ) {
    StoreService.updateArray(
      ArrayName.permissions,
      [permissions],
      [{ ...permissions, [fieldValue]: value }],
      StoreService.doc(CollectionsName.users, updatedUserUid)
    );
  }
  static generatePermissiosObject(id: string) {
    return {
      id,
      isLeader: false,
      canServiceMember: false,
      canServiceProjects: false,
      canServiceColumns: false,
      canServiceTasks: false,
    };
  }
  static addMember(uid: string, teamId: string) {
    const refUser = StoreService.doc(CollectionsName.users, uid);
    const refMebers = StoreService.doc(CollectionsName.teams, teamId);

    StoreService.arrayPush(ArrayName.permissions, this.generatePermissiosObject(teamId), refUser);
    StoreService.arrayPush(ArrayName.members, refUser, refMebers);
  }
}

export default TeamService;

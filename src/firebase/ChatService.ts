import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { CollectionsName } from "utils/utils";
import StoreService from "./StoreService";

class ChatService {
  static async createMessage(path: string, message: string, currentUser: User) {
    const { uid, email } = currentUser;
    const now = Timestamp.now();
    const messageBody = {
      uid: uid,
      author: email,
      content: message,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await StoreService.createDoc(messageBody, StoreService.collection(path));
    await StoreService.setDoc(
      { uid: uid, messageRef: docRef },
      StoreService.doc(CollectionsName.messages, `ref${docRef.id}`)
    );
  }
  static async removeMessage(path: string, id: string) {
    await StoreService.removeDoc(StoreService.doc(path, id));
    await StoreService.removeDoc(StoreService.doc(CollectionsName.messages, `ref${id}`));
  }
}

export default ChatService;

import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
  deleteUser,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { auth } from "./fb";

class AuthService {
  static async signIn(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (e) {
      throw new Error(
        "Nie udało się zalogować. Sprawdź dokładnie wpisywane dane i spróbuj ponownie!"
      );
    }
  }
  static async signOut() {
    try {
      await signOut(auth);
    } catch (e) {
      throw new Error("Nie udało się wylogować.");
    }
  }
  static async createUser(email: string, password: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      return user;
    } catch (e) {
      throw new Error("Nie udało się utworzyć konta.");
    }
  }
  static async removeAccount(user: User) {
    try {
      await deleteUser(user);
    } catch (e) {
      throw new Error("Nie udało się usunąć konta!");
    }
  }
  static async resetPassword(user: User, password: string) {
    try {
      await updatePassword(user, password);
    } catch (e) {
      throw new Error("Nie udało się zmienić hasła.");
    }
  }
  static async changeEmail(user: User, email: string) {
    try {
      await updateEmail(user, email);
    } catch (e) {
      throw new Error("Nie udało się zmienić emalia.");
    }
  }
}

export default AuthService;

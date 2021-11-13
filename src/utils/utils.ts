import fb, { store } from "data/fb";

export const removeDoc = async (collection: string, id: string, setError: (alert: string | null) => void) => {
  try {
    await fb.deleteDoc(fb.doc(store, collection, id));
  } catch (e) {
    setError("Niestety nie możemy usunąć tego :c");
  }
};

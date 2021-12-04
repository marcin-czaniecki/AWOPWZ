import {
  Query,
  QueryConstraint,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  getDocs,
} from "@firebase/firestore";
import { useState, useEffect, useMemo } from "react";

const useDocumentsWithCustomQuery = <T extends unknown>(
  queryCollectionReference: Query<T>,
  ...queryConstraints: QueryConstraint[]
): [QueryDocumentSnapshot<T>[] | QueryDocumentSnapshot<DocumentData>[], boolean, boolean] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [docs, setDocs] = useState<
    QueryDocumentSnapshot<T>[] | QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const queryDocs = query<T>(queryCollectionReference, ...queryConstraints);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const projectSnapshot = await getDocs<T>(queryDocs);
        setDocs(projectSnapshot.docs);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [docs, loading, error];
};

export default useDocumentsWithCustomQuery;

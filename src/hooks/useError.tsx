import { createContext, useContext, useState, useCallback, useEffect } from "react";

export const ErrorContext = createContext<{ error: string | null; setError: (alert: string | null) => void }>({
  error: "",
  setError: (alert) => {},
});

export const ErrorProvider = ({ children }: { children: JSX.Element }) => {
  const [error, setError] = useState<string | null>(null);

  const dispatchError = useCallback((alert: string | null) => {
    setError(alert);
  }, []);

  useEffect(() => {
    const clearError = setTimeout(() => {
      dispatchError(null);
    }, 7000);
    return () => {
      clearTimeout(clearError);
    };
  }, [error, dispatchError]);

  return <ErrorContext.Provider value={{ error, setError: dispatchError }}>{children}</ErrorContext.Provider>;
};

export const useError = () => {
  const error = useContext(ErrorContext);
  if (!error) {
    throw Error("useError needs to be inside inside ErrorContext");
  }
  return error;
};

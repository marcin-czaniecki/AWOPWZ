import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { TypeToast } from "types/types";

export const ToastContext = createContext<{
  message: string;
  type: TypeToast;
  setToast: (message: string, type?: TypeToast) => void;
}>({
  message: "",
  type: "default",
  setToast: () => {},
});

export const ToastProvider = ({ children }: { children: JSX.Element }) => {
  const [toast, setToast] = useState<{ message: string; type: TypeToast }>({ message: "", type: "default" });
  const { message, type } = toast;
  const dispatchToast = useCallback((message: string, type: TypeToast = "default") => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    const clearError = setTimeout(() => {
      dispatchToast("");
    }, 7000);
    return () => {
      clearTimeout(clearError);
    };
  }, [toast, dispatchToast]);

  return <ToastContext.Provider value={{ message, type, setToast: dispatchToast }}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const toast = useContext(ToastContext);
  if (!toast) {
    throw Error("useError needs to be inside inside ToastProvider");
  }
  return toast;
};

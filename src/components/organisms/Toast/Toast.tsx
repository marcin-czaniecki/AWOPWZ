import { TypeToast } from "types/types";
import { WrapperToast } from "./Toast.styles";

const Toast = ({ message, type }: { type?: TypeToast; message?: string | null }) => {
  return (
    <>
      {message ? (
        <WrapperToast type={type}>
          <div>
            <h3>Uwaga!</h3>
          </div>
          <div>{message}</div>
        </WrapperToast>
      ) : null}
    </>
  );
};

export default Toast;

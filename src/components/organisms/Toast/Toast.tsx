import { WrapperToast } from "./Toast.styles";

const Toast = ({ message }: { type?: string; message?: string | null }) => {
  return (
    <>
      {message ? (
        <WrapperToast>
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

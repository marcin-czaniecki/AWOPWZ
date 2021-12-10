import { ErrorMessage } from "utils/utils";

const ErrorData = ({ message }: { message?: string }) => {
  return (
    <div>
      <p>{message || ErrorMessage.default}</p>
    </div>
  );
};

export default ErrorData;

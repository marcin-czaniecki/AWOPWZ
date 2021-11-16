import { useNavigate } from "react-router-dom";
import { StyledButtonBack } from "./ButtonBack.styles";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <StyledButtonBack
      onClick={() => {
        navigate(-1);
      }}
    />
  );
};

export default ButtonBack;

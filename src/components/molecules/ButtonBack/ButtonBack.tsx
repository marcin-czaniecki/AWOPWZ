import { Link, To, useNavigate } from "react-router-dom";
import { StyledButtonBack } from "./ButtonBack.styles";

const ButtonBack = ({ path }: { path?: To }) => {
  const navigate = useNavigate();
  if (path) {
    return (
      <Link to={path}>
        <StyledButtonBack />
      </Link>
    );
  }
  return (
    <StyledButtonBack
      onClick={() => {
        if (!path) {
          navigate(-1);
        }
      }}
    />
  );
};

export default ButtonBack;

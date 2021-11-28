import { Link, To, useNavigate } from "react-router-dom";
import { StyledButtonBack } from "./ButtonBack.styles";

const ButtonBack = ({ path }: { path?: To }) => {
  const navigate = useNavigate();
  if (path) {
    return (
      <Link to={path}>
        <StyledButtonBack typeButton="arrow" />
      </Link>
    );
  }

  const moveToPreviousPage = () => !path && navigate(-1);

  return <StyledButtonBack typeButton="arrow" onClick={moveToPreviousPage} />;
};

export default ButtonBack;

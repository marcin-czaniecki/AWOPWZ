import { LinkProps, useResolvedPath, useMatch } from "react-router-dom";
import { StyledLink } from "./CustomLink.styles";

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <StyledLink to={to} active={match} {...props}>
      {children}
    </StyledLink>
  );
};

export default CustomLink;

import { Link } from "react-router-dom";
import { theme } from "theme/theme";
import { ICardProps } from "types/componentTypes";
import KebabMenu from "../KebabMenu/KebabMenu";
import { WrapperCard, WrapperCardContent } from "./Card.styles";

const Card = ({ to, children, kebabMenuChildren, color }: ICardProps) => {
  return (
    <WrapperCard>
      <KebabMenu color={color || theme.color.primary}>{kebabMenuChildren}</KebabMenu>
      <Link to={to} style={{ textDecoration: "none" }}>
        <WrapperCardContent>{children}</WrapperCardContent>
      </Link>
    </WrapperCard>
  );
};

export default Card;

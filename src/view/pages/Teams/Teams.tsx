import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import { useLocation } from "react-router";

interface ICardHeaderProps {
  children?: React.ReactChild;
  KebabMenuChildren?: React.ReactChild[];
}

const CardHeader = ({ children, KebabMenuChildren }: ICardHeaderProps) => {
  return (
    <div>
      <div>{children}</div>
      {KebabMenuChildren && <KebabMenu>{KebabMenuChildren}</KebabMenu>}
    </div>
  );
};

const CardBody = ({ children }: { children: React.ReactChild }) => {
  return <div>{children}</div>;
};

interface ICardProps {
  header?: React.ReactChild;
  children: React.ReactChild;
  settings?: React.ReactChild[];
}

const Card = ({ header, children }: ICardProps) => {
  return (
    <div>
      <CardHeader>{header}</CardHeader>
      <CardBody>{children}</CardBody>
    </div>
  );
};

const TeamCard = ({ children }: { children: React.ReactElement }) => {
  return (
    <div>
      <Card>{children}</Card>
    </div>
  );
};

const Teams = () => {
  return <div>x</div>;
};

export default Teams;

import { ILoading } from "types/componentTypes";
import { Ceiling, Cube, Floor, Wall, Walls, WrapperLoading } from "./Loading.styles";

const Loading = ({ size = "150px" }: ILoading) => {
  return (
    <WrapperLoading>
      <Cube size={size}>
        <Ceiling size={size} />
        <Walls>
          <Wall i="1" size={size} />
          <Wall i="2" size={size} />
          <Wall i="3" size={size} />
          <Wall i="4" size={size} />
        </Walls>
        <Floor size={size} />
      </Cube>
    </WrapperLoading>
  );
};

export default Loading;

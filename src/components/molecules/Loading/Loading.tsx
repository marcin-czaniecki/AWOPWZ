import { WrapperLoading, Cube, Ceiling, Walls, Wall, Floor } from "./Loading.styles";

const Loading = ({ size = "150px" }: { size?: string }) => {
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

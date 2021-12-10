import { IDetalisProps } from "types/componentTypes";
import { WrapperDetails, WrapperDetailsElements, WrapperDetailsElement } from "./Details.styles";

const Details = ({ summary = "Legenda", children }: IDetalisProps) => (
  <WrapperDetails>
    <summary>{summary}</summary>
    <WrapperDetailsElements>
      {Array.isArray(children) ? (
        <>
          {children.map((child, i) => (
            <WrapperDetailsElement key={`${summary + i}`}>{child}</WrapperDetailsElement>
          ))}
        </>
      ) : (
        <WrapperDetailsElement>{children}</WrapperDetailsElement>
      )}
    </WrapperDetailsElements>
  </WrapperDetails>
);

export default Details;

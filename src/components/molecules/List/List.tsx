import { IListProps } from "types/componentTypes";

const List = <T extends unknown>({ WrapperList, array, callbackfn }: IListProps<T>) => (
  <WrapperList>{array.map(callbackfn)}</WrapperList>
);

export default List;

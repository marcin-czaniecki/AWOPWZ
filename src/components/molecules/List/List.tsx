interface IListProps<T> {
  array: T[];
  callbackfn: (value: T, index: number, array: T[]) => JSX.Element;
  WrapperList: (props: { children: JSX.Element | JSX.Element[] }) => JSX.Element;
}

const List = <T extends unknown>({ WrapperList, array, callbackfn }: IListProps<T>) => <WrapperList>{array.map(callbackfn)}</WrapperList>;

export default List;

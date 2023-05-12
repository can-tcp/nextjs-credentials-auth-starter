export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export interface StatefulComponent<T> {
  controller: State<T>;
}

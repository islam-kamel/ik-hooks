export type SetValueCallbackType<T> = (prevState: T) => T;
export type KeyType = string
export type ValueType<T> = T
export type DispatchType<T> = (value: T | SetValueCallbackType<T>) => T

export interface RemoveArgsType {
    reset?: boolean;
}
// make options as optional
export type Remove = (options?: RemoveArgsType) => void;

export type UseLocalStorageReturnType<T> = [
    value: T,
    set: DispatchType<T>,
    remove: Remove
];
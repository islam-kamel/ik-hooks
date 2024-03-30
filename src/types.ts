export type SetValueCallbackType<T> = (prevState: T) => T;
export type DispatchType<T, R> = (value: T | SetValueCallbackType<T>) => R

import {SetStateAction} from "react";

export type SetValueCallbackType<T> = SetStateAction<T>;
// export type DispatchType<T, R> = (value: T | SetValueCallbackType<T>) => R
export type DispatchType<T, R> = (value: T | SetValueCallbackType<T>) => R

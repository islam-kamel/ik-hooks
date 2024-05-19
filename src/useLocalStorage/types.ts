import {SetStateAction} from "react";

export interface RemoveArgsType {
  reset?: boolean;
}

// make options as optional
export type Remove = (options?: RemoveArgsType) => void;

export type UseLocalStorageReturnType<T> = {
  value: T,
  getValue: () => T | null
  setValue: (value: T | SetStateAction<T>) => T,
  removeValue: Remove,
};
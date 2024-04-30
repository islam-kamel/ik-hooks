import {DispatchType} from "../types";

export type KeyType = string
export type ValueType<T> = T

export interface RemoveArgsType {
    reset?: boolean;
}

// make options as optional
export type Remove = (options?: RemoveArgsType) => void;

export type UseLocalStorageReturnType<T> = {
    value: T,
    set: DispatchType<T, T>,
    remove: Remove,
    get: () => T | null,
    processing: boolean,
    getAsyncValue: () => Promise<T | null>

};
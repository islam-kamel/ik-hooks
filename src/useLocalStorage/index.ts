import {useCallback, useEffect, useState} from "react";
import {getItem, removeItem, setItem} from "./utils";
import {KeyType, RemoveArgsType, UseLocalStorageReturnType, ValueType} from "./types";
import {SetValueCallbackType} from "../types";

let timer: NodeJS.Timeout;

/**
 * useLocalStorage React Hook for managing state with local storage.
 * @template T - The type of the value to be stored.
 * @param {string} key - The key under which the value is stored.
 * @param {T} initialValue - The initial value.
 * @returns {[T, Function]} The current value and a function to update it.
 */
const useLocalStorage = <T>(key: KeyType, initialValue: ValueType<T>): UseLocalStorageReturnType<T> => {
    const [value, _setValue] = useState<T>(initialValue)
    const [processing, setProcessing] = useState<boolean>(true)


    const _setValueFormCallback = useCallback((value: SetValueCallbackType<T>): T => {
        let newValue = null;

        _setValue(prev => {
            if (value instanceof Function) {
                newValue = value(prev);
            } else {
                newValue = value;
            }
            setItem(newValue, key);
            return newValue;
        })

        return newValue as T;
    }, [key])


    /**
     * Updates the value in the state and the local storage.
     * @template T - The type of the value to be stored.
     * @param {T | ((state: T) => T)} value - The new value or a function to update the current value.
     * @returns {T} The new value.
     */
    const setValue = useCallback((value: ValueType<T> | SetValueCallbackType<T>): T => {
        if (value instanceof Function) return _setValueFormCallback(value);

        const newValue = value;
        setItem(value, key);
        _setValue(value);

        return newValue as T;
    }, [_setValueFormCallback, key])

    const getStorage = useCallback(() => {
        return getItem<T>(key)
    }, [key])

    const getAsyncValue = useCallback(async () => {
        return new Promise<T | null>((resolve) => {
            setTimeout(() => {
                const item = getItem<T>(key)
                resolve(item)
            }, 100)
        })
    }, [key])

    /**
     * Removes the item from the local storage.
     * @default reset - true
     * @param {boolean} reset  - If true, the state is reset to the initial value.
     */
    const remove = useCallback((options?: RemoveArgsType) => {
        const {reset = true} = options || {};
        if (!reset) {
            removeItem(key)
            _setValue(null as unknown as T)
            return;
        }
        setValue(initialValue)
        _setValue(initialValue)
        return;
    }, [initialValue, key, setValue])

    // Effect to initialize the state from the local storage.
    useEffect(() => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            const item = getItem<T>(key)
            if (item) _setValue(item)
            else setValue(initialValue)
            setProcessing(false)
        }, 100)
    }, [initialValue, key, setValue])

    return {value, set: setValue, remove, get: getStorage, getAsyncValue, processing}
    // return [value, setValue, remove, getStorage]
}

export {useLocalStorage}
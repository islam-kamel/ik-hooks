import {useCallback, useEffect, useState} from "react";
import {getItem, removeItem, setItem} from "./utils";
import {KeyType, RemoveArgsType, SetValueCallbackType, UseLocalStorageReturnType, ValueType} from "./types";


/**
 * useLocalStorage React Hook for managing state with local storage.
 * @template T - The type of the value to be stored.
 * @param {string} key - The key under which the value is stored.
 * @param {T} initialValue - The initial value.
 * @returns {[T, Function]} The current value and a function to update it.
 */
const useLocalStorage = <T>(key: KeyType, initialValue: ValueType<T>): UseLocalStorageReturnType<T> => {
    const [value, _setValue] = useState<T>(initialValue)


    const _setValueFormCallback = (value: SetValueCallbackType<T>): T => {
        let newValue = null;

        _setValue(prev => {
            newValue = value(prev);
            setItem(newValue, key);
            return newValue;
        })

        return newValue as T;
    }


    /**
     * Updates the value in the state and the local storage.
     * @template T - The type of the value to be stored.
     * @param {T | ((state: T) => T)} value - The new value or a function to update the current value.
     * @returns {T} The new value.
     */
    const setValue = useCallback((value: ValueType<T> | SetValueCallbackType<T>): T => {
        if (value instanceof Function) return _setValueFormCallback(value);

        let newValue = value;
        setItem(value, key);
        _setValue(value);

        return newValue as T;
    }, [])

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
    }, [])

    // Effect to initialize the state from the local storage.
    useEffect(() => {
        const item = getItem<T>(key)
        _setValue(item || initialValue)
    }, [initialValue])

    return [value, setValue, remove]
}

export {useLocalStorage}
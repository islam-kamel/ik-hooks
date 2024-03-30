import {useCallback, useEffect, useState} from "react";
import {SetValueCallbackType} from "../types";


/**
 * useToggle React Hook for managing boolean state.
 * @param {boolean} initialValue - The initial value.
 * @returns {[boolean, Function]} The current value and a function to toggle it.
 */
const useToggle = (initialValue: boolean = false): [value: boolean, (value?: boolean | SetValueCallbackType<boolean>) => void] => {
    const [value, setValue] = useState(initialValue);

    /**
     * Toggles the value.
     * @param {boolean | ((state: boolean) => boolean)} value - The new value or a function to update the current value.
     */
    const toggle = useCallback((value?: boolean | SetValueCallbackType<boolean>) => {
        if (value instanceof Function) {
            setValue(value);
            return;
        } else if (value) {
            setValue(value);
            return;
        }

        setValue(prev => !prev);
    }, [])


    useEffect(() => {
        setValue(initialValue);
    }, []);

    return [value, toggle];
}

export {useToggle};
import {useCallback, useEffect, useState} from "react";
import {SetValueCallbackType} from "../types";


/**
 * useToggle React Hook for managing boolean state.
 * @param {boolean} initialValue - The initial value.
 * @returns {[boolean, Function]} The current value and a function to toggle it.
 */
const useToggle = (initialValue: boolean = false): [value: boolean, (value?: SetValueCallbackType<boolean>) => void] => {
    const [value, setValue] = useState<boolean>(initialValue);

    /**
     * Toggles the value.
     */
    const toggle = useCallback((value?: SetValueCallbackType<boolean> ) => {
        if (value instanceof Function) {
            setValue(value);
            return;
        } else if (typeof value === "boolean") {
            setValue(value);
            return;
        }
        setValue(prev => !prev);
    }, [])


    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return [value, toggle];
}

export {useToggle};
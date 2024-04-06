import {KeyType} from "./types";

/**
 * Sets an item in the local storage.
 * @param {any} value - The value to be stored.
 * @param {string} key - The key under which the value is stored.
 */
const setItem = <T>(value: T, key: KeyType) => {
    window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Retrieves an item from the local storage.
 * @template T - The type of the value to be stored.
 * @param {string} key - The key under which the value is stored.
 * @returns {T | null} The retrieved value or null if no value is found.
 */
const getItem = <T>(key: KeyType): T | null => {
    const item = window.localStorage.getItem(key)
    if (item) return JSON.parse(item)
    return null
}

/**
 * Removes an item from the local storage.
 * @param {string} key - The key under which the value is stored.
 */
const removeItem = (key: KeyType) => {
    window.localStorage.removeItem(key)
}

export {setItem, getItem, removeItem}
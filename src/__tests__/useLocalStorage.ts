import {act, renderHook} from '@testing-library/react'
import {useLocalStorage} from "../index";
import {UseLocalStorageReturnType} from "../useLocalStorage/types";

const KEY = 'test'
const INITIAL_VALUE = 'initial'

describe('useLocalStorage', () => {
    let result: UseLocalStorageReturnType<string>;
    beforeAll(() => {
        const {result: rs} = renderHook(() => useLocalStorage(KEY, INITIAL_VALUE))
        result = rs.current;

    })
    beforeEach(() => {
        localStorage.clear()
    })

    it('returns initial value when local storage is empty', () => {
        const {value} = result;

        expect(value).toBe(INITIAL_VALUE)
    })

    it('returns stored value when local storage is not empty', () => {
        localStorage.setItem('test', JSON.stringify('stored'))
        const {result} = renderHook(() => useLocalStorage('test', 'initial'))
        const {value} = result.current;

        setTimeout(() => {
            expect(value).toBe('stored')
        }, 100)
    })

    it('updates the value in local storage when set', () => {
        const {value, set: setValue} = result;
        act(() => {
            setValue("updated")
        })

        setTimeout(() => {
            expect(value).toBe('updated')
        }, 100)

        expect(localStorage.getItem('test')).toBe(JSON.stringify('updated'))
    })

    it('updates the value in local storage when set with a function', () => {
        const {value, set: setValue} = result;

        act(() => {
            setValue("initial updated")
        })


        setTimeout(() => {
            expect(value).toBe('initial updated')
        }, 100)
        expect(localStorage.getItem('test')).toBe(JSON.stringify('initial updated'))
    })

    it("resets the value in local storage when reset", () => {
        localStorage.setItem('test', JSON.stringify('stored'))
        const {value, set: setValue, remove} = result;

        act(() => {
            setValue("updated")
            remove({reset: true})
        })

        setTimeout(() => {
            expect(value).toBe('initial')
        }, 100)
        expect(localStorage.getItem('test')).toBe(JSON.stringify('initial'))
    })

    it('deletes the value in local storage when removed', () => {
        localStorage.setItem('test', JSON.stringify('stored'))
        const {value, remove} = result;

        act(() => {
            remove({reset: false})
        })

        setTimeout(() => {
            expect(value).toBe("initial")
        }, 100)
        expect(localStorage.getItem('test')).toBe(null)
    })
})
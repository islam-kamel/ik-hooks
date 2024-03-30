// import {act} from "react-dom/test-utils";
import {act, renderHook} from '@testing-library/react'
import {useLocalStorage} from "../index";

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('returns initial value when local storage is empty', () => {
        const {result} = renderHook(() => useLocalStorage('test', 'initial'))

        expect(result.current[0]).toBe('initial')
    })

    it('returns stored value when local storage is not empty', () => {
        localStorage.setItem('test', JSON.stringify('stored'))
        const {result} = renderHook(() => useLocalStorage('test', 'initial'))

        expect(result.current[0]).toBe('stored')
    })

    it('updates the value in local storage when set', () => {
        const {result} = renderHook(() => useLocalStorage('test', 'initial'))

        act(() => {
            result.current[1]('updated')
        })

        expect(result.current[0]).toBe('updated')
        expect(localStorage.getItem('test')).toBe(JSON.stringify('updated'))
    })

    it('updates the value in local storage when set with a function', () => {
        const {result} = renderHook(() => useLocalStorage('test', 'initial'))

        act(() => {
            result.current[1]((prev) => `${prev} updated`)
        })

        expect(result.current[0]).toBe('initial updated')
        expect(localStorage.getItem('test')).toBe(JSON.stringify('initial updated'))
    })

    it("resets the value in local storage when reset", () => {
        localStorage.setItem('test', JSON.stringify('stored'))
        const {result} = renderHook(() => useLocalStorage('test', 'initial'))

        act(() => {
            result.current[1]("updated")
            result.current[2]({reset: true})
        })

        expect(result.current[0]).toBe('initial')
        expect(localStorage.getItem('test')).toBe(JSON.stringify('initial'))
    })

    it('deletes the value in local storage when removed', () => {
        localStorage.setItem('test', JSON.stringify('stored'))
        const {result} = renderHook(() => useLocalStorage('test', 'initial'))

        act(() => {
            result.current[2]({reset: false})
        })

        expect(result.current[0]).toBe(null)
        expect(localStorage.getItem('test')).toBe(null)
    })
})
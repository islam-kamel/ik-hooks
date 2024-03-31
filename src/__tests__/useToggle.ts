import {act, renderHook} from '@testing-library/react'
import {useToggle} from "../index";

describe("useToggle", () => {
    it("returns initial value", () => {
        const {result} = renderHook(() => useToggle())

        expect(result.current[0]).toBe(false)
    })

    it("returns initial value with a custom initial value", () => {
        const {result} = renderHook(() => useToggle(true))

        expect(result.current[0]).toBe(true)
    })

    it("returns toggled value", () => {
        const {result} = renderHook(() => useToggle(true))

        act(() => {
            result.current[1]()
        })
        expect(result.current[0]).toBe(false)
    })

    it("returns toggled value with a custom toggle value", () => {
        const {result} = renderHook(() => useToggle())

        act(() => {
            result.current[1](true)
        })
        expect(result.current[0]).toBe(true)
    })
    it("returns toggled value with a callback function", () => {
        const {result} = renderHook(() => useToggle())

        act(() => {
            result.current[1]((prev) => !prev)
        })
        expect(result.current[0]).toBe(true)
    })
})

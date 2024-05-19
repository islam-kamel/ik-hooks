import {act, renderHook} from '@testing-library/react'
import {useLocalStorage} from "../index";
import {UseLocalStorageReturnType} from "../useLocalStorage/types";

type MainType = UseLocalStorageReturnType<string>;
type SetValue = MainType["setValue"];
type Remove = MainType["removeValue"];
type GetValue = MainType["getValue"];
type Value = MainType["value"];


describe('useLocalStorage', () => {
  let removeValue: Remove, setValue: SetValue, value: Value, getValue: GetValue
  beforeEach(() => {
    removeValue();
  })
  beforeAll(() => {
    const {result} = renderHook(() => useLocalStorage('test', 'initial'))
    removeValue = result.current.removeValue;
    setValue = result.current.setValue;
    value = result.current.value;
    getValue = result.current.getValue;
  })

  it('returns initial value when local storage is empty', () => {
    expect(value).toBe('initial')
  })

  it('returns stored value when local storage is not empty', () => {
    localStorage.setItem('notEmpty', JSON.stringify('stored'))
    const {result} = renderHook(() => useLocalStorage('notEmpty', 'initial'))

    expect(result.current.value).toBe('stored')
  })

  it('updates the value in local storage when set', () => {
    act(() => {
      setValue('updated')
    })

    setTimeout(() => {

      expect(value).toBe('updated')
      expect(localStorage.getItem('test')).toBe(JSON.stringify('updated'))
    })
  })

  it('updates the value in local storage when set with a function', () => {
    act(() => {
      setValue((prev) => `${prev} updated`)
    })

    setTimeout(() => {

      expect(value).toBe('initial updated')
      expect(localStorage.getItem('test')).toBe(JSON.stringify('initial updated'))
    }, 0)
  })

  it("resets the value in local storage when reset", () => {
    act(() => {
      setValue("updated")
      removeValue({reset: true})
    })

    setTimeout(() => {
      expect(value).toBe('initial')
      expect(localStorage.getItem('test')).toBe(JSON.stringify('initial'))
    })
  })

  it('deletes the value in local storage when removed', () => {
    act(() => {
      setValue("updated")
      removeValue({reset: false})
    })
    setTimeout(() => {
      expect(value).toBe(null)
      expect(localStorage.getItem('test')).toBe(null)
    }, 0)
  })

  it('returns the value from local storage', () => {
    localStorage.setItem('test', JSON.stringify('stored'))
    expect(getValue()).toBe('stored')
  })
})
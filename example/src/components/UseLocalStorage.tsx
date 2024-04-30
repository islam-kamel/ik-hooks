import {useLocalStorage} from "ik-hooks";
import {useCallback, useEffect} from "react";

function UseLocalStorage() {

    const {value: count, remove, set: setCount, get: getCount, processing, getAsyncValue} = useLocalStorage('count', 0)

    const onReset = useCallback(() => {
        remove()
    }, [remove])

    const onRemove = useCallback(() => {
        remove({reset: false})
    }, [remove])

    useEffect(() => {
        console.log("get Storage", getCount())
    }, [getCount]);

    useEffect(() => {
        getAsyncValue().then(value => {
            console.log("getAsyncValue", value)
        })
    }, [getAsyncValue]);

    useEffect(() => {
        console.log("here")
    }, []);

    return (
        <>
            <h2>useLocalStorage</h2>
            <div className="card">
                <button onClick={() => {
                    setCount(prevState => prevState + 1)
                }}>
                    {processing ? 'Processing...' : <>count is {count}</>}
                </button>
                <button
                    onClick={onReset}
                >
                    Rest
                </button>
                <button
                    onClick={onRemove}
                >
                    Remove
                </button>
            </div>
        </>
    );
}

export default UseLocalStorage;
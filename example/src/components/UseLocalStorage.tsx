import {useLocalStorage} from "ik-hooks";
import {useCallback, useEffect} from "react";

function UseLocalStorage() {

    const [count, setCount, remove, getStorage] = useLocalStorage('count', 0)

    const onReset = useCallback(() => {
        remove()
    }, [remove])

    const onRemove = useCallback(() => {
        remove({reset: false})
    }, [remove])

    useEffect(() => {
        console.log("get Storage", getStorage())
    }, [getStorage]);

    return (
        <>
            <h2>useLocalStorage</h2>
            <div className="card">
                <button onClick={() => {
                    setCount(prev => {
                        return prev + 1
                    })
                }}>
                    count is {count}
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
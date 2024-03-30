import {useLocalStorage} from "ik-hooks";
import {useCallback} from "react";

function UseLocalStorage() {

    const [count, setCount, remove] = useLocalStorage('count', 0)

    const onReset = useCallback(() => {
        remove()
    }, [])

    const onRemove = useCallback(() => {
        remove({reset: false})
    }, [])

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
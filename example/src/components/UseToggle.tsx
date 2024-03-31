import {useToggle} from "ik-hooks";

function UseToggle() {
    const [isOpen, toggle] = useToggle(true)

    return (
        <>
            <h2>useToggle</h2>
            <button onClick={() => toggle(prev => !prev)}>
                {isOpen ? 'Open' : 'Close'}
            </button>
        </>
    );
}

export default UseToggle;
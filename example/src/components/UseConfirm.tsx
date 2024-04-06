import {useConfirm} from "ik-hooks";

function UseConfirm() {
    const {dialog, toggle} = useConfirm({
        onConfirm: () => console.log("confirmed"),
        onCancel: () => console.log("canceled"), // Optional
        message: "Are you sure ?", // Optional
        dialog: ({open, onCancel, onConfirm, message}) => (
            <dialog open={open}>
                <p>{message}</p>
                <p>Custom Dialog</p>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onCancel}>Cancel</button>
            </dialog>
        ), // Optional Custom Component
    });

    return (
        <>
            <h2>useConfirm</h2>
            <button onClick={() => toggle()}>Open Dialog</button>
            {dialog}
        </>
    );
}

export default UseConfirm;
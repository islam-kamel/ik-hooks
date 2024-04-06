import {IDialogProps} from "./types";

function Dialog(props: IDialogProps) {
    return (
        <dialog open={props.open}>
            {props.message && <p>{props.message}</p>}
            <button onClick={props.onConfirm}>Confirm</button>
            <button onClick={props.onCancel}>Cancel</button>
        </dialog>
    );
}

export default Dialog;
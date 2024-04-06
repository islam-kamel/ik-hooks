import {useToggle} from "../useToggle";
import {useCallback} from "react";
import {IUseConfirmType} from "./types";
import Dialog from "./Dialog";

const useConfirm = ({onConfirm, onCancel, message, dialog: CustomDialog}: IUseConfirmType) => {
    const [open, toggle] = useToggle()


    const _onConfirm = useCallback(() => {
        onConfirm()
        toggle()
    }, [onConfirm, toggle])

    const _onCancel = useCallback(() => {
        if (onCancel instanceof Function) onCancel();
        toggle()
    }, [onCancel, toggle])

    const _props = {
        open,
        message,
        onConfirm: _onConfirm,
        onCancel: _onCancel,
    }

    const dialog = CustomDialog ? CustomDialog(_props) : Dialog(_props)

    return {
        toggle,
        dialog
    }
}

export {useConfirm};
import {FC} from "react";

export interface IDialogProps {
    open: boolean;
    message?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

export interface IUseConfirmType {
    message?: string;
    onConfirm: () => void;
    onCancel?: () => void;
    dialog?: FC<IDialogProps>;
}
import {act, render, renderHook} from "@testing-library/react";
import {useConfirm} from "../useConfirm";

describe("useConfirm", () => {
    it("should return dialog", () => {
        const {result} = renderHook(() =>
            useConfirm({
                onConfirm: () => console.log("confirmed"),
                onCancel: () => console.log("canceled"),
                message: "Are you sure ?",
                dialog: ({open, onCancel, onConfirm, message}) => (
                    <dialog open={open}>
                        <p>{message}</p>
                        <p>Custom Dialog</p>
                        <button
                            onClick={onConfirm}> Confirm
                        </button>
                        <button
                            onClick={onCancel}> Cancel
                        </button>
                    </dialog>
                ),
            })
        );

        act(() => {
            result.current.toggle();
        })
        const dialog = render(<> {result.current.dialog} </>);
        expect(dialog.getByText("Custom Dialog")).toBeTruthy();
        expect(dialog.getByText("Are you sure ?")).toBeTruthy();
        expect(dialog.getByText("Confirm")).toBeTruthy();
        expect(dialog.getByText("Cancel")).toBeTruthy();
        expect(dialog.getByRole("dialog")).toBeTruthy();
        expect(result.current.dialog).toBeTruthy();
    });

    it("should toggle dialog", () => {
        const {result} = renderHook(() =>
            useConfirm({
                onConfirm: () => console.log("confirmed"),
                onCancel: () => console.log("canceled"),
                message: "Are you sure ?",
            })
        );

        act(() => {
            result.current.toggle();
        });

        const dialog = render(<> {result.current.dialog} </>);
        expect(dialog.getByText("Are you sure ?")).toBeTruthy();
        expect(dialog.getByText("Are you sure ?")).toBeTruthy();

        act(() => {
            result.current.toggle();
        });
        dialog.rerender(<> {result.current.dialog} </>);
        expect(dialog.queryByRole("dialog")?.getAttribute("open")).toBeUndefined();
        expect(dialog.getByText("Are you sure ?")).toBeTruthy();
    });

    it("should has props", () => {
        const {result} = renderHook(() =>
            useConfirm({
                onConfirm: () => console.log("confirmed"),
                onCancel: () => console.log("canceled"),
                message: "Are you sure ?",
            })
        );

        act(() => {
            result.current.toggle();
        })
        const dialog = render(<> {result.current.dialog} </>);

        expect(dialog.getByText("Are you sure ?")).toBeTruthy();
        expect(dialog.getByText("Confirm")).toBeTruthy();
        expect(dialog.getByText("Cancel")).toBeTruthy();
        expect(dialog.getByRole("dialog")).toBeTruthy();
        expect(dialog.getByRole("dialog").getAttribute("open")).toBeDefined();
    })
})
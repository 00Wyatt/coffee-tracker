import ReactDom from "react-dom";

export default function Modal({ children, handleCloseModal }) {
    return ReactDom.createPortal(
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center p-1">
            <button
                onClick={handleCloseModal}
                className="absolute z-40 w-full bg-neutral-900 opacity-50 [inset:0]"
            />
            <div className="modal-content relative z-50 w-full max-w-lg rounded-lg bg-white p-6 sm:p-8 dark:bg-slate-700">
                {children}
            </div>
        </div>,
        document.getElementById("portal"),
    );
}

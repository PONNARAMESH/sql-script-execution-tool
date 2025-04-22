import Toast, { IToast } from "./toastComponent";
import styles from "./styles.module.scss";

export type TToastsContainer = {
  toasts: IToast[];
  position:
    | "topRight"
    | "topLeft"
    | "topCenter"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight";
};

const ToastsContainer = ({ toasts, position }: TToastsContainer) => {
  return (
    <div
      className={`${styles.toastsContainer} ${styles[position]}`}
      data-testid={"toastContainer"}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastsContainer;

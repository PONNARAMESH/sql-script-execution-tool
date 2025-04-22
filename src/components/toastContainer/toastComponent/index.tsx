import { useContext, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

import { ToastContext } from "@/context/toastContext";

const toastTypes: Record<string, any> = {
  SUCCESS: {
    bgColor: styles.successToastBGColor,
    iconName: "CheckCircle",
    iconClass: styles.successIcon,
    progressBarClass: styles.success,
  },
  WARNING: {
    bgColor: styles.warningToastBGColor,
    iconName: "Warning",
    iconClass: styles.warningIcon,
    progressBarClass: styles.warning,
    fontColor: styles.warningToastFontColor,
  },
  INFO: {
    bgColor: styles.infoToastBGColor,
    iconName: "Error",
    iconClass: styles.infoIcon,
    progressBarClass: styles.info,
  },
  ERROR: {
    bgColor: styles.errorToastBGColor,
    iconName: "Error",
    iconClass: styles.errorIcon,
    progressBarClass: styles.error,
  },
};

export type TToastType = "SUCCESS" | "ERROR" | "WARNING" | "INFO";

export type TToastClosingType = "AUTO" | "MANUAL";
export interface IToast {
  toastClosingType: TToastClosingType;
  message: string;
  type: TToastType;
  id: string;
}
interface TDivElement extends HTMLDivElement {
  parentElement: HTMLDivElement;
}

const Toast = ({ message, type, id, toastClosingType }: IToast) => {
  const timerID = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const progressRef = useRef<TDivElement>(null);

  const { iconName, progressBarClass, bgColor, iconClass } = toastTypes[type];
  const toast = useContext(ToastContext);

  const handleDismiss = () => {
    toast.removeToast && toast.removeToast(id);
  };

  const handleMouseEnter = () => {
    if (!progressRef.current) return;
    clearTimeout(timerID.current);
    progressRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    if (!progressRef.current) return;
    const remainingTime =
      (progressRef.current.offsetWidth /
        progressRef.current.parentElement.offsetWidth) *
      4000;

    progressRef.current.style.animationPlayState = "running";

    timerID.current = setTimeout(() => {
      handleDismiss();
    }, remainingTime);
  };

  useEffect(() => {
    if (toastClosingType === "AUTO") {
      timerID.current = setTimeout(() => {
        handleDismiss();
      }, 4000);

      return () => {
        clearTimeout(timerID.current);
      };
    }
  }, [toastClosingType]);

  const emptyFunction = () => {};

  return (
    <div
      className={`${styles.toast} ${bgColor}`}
      onMouseEnter={
        toastClosingType === "MANUAL" ? handleMouseEnter : emptyFunction
      }
      onMouseLeave={
        toastClosingType === "MANUAL" ? handleMouseLeave : emptyFunction
      }
      data-testid="toastMessage"
      role="menuitem"
      tabIndex={0}
    >
      {/* <Icon customClass={iconClass} iconName={iconName} size={24} uniqueId={`pace-icon-${id}`} /> */}
      <p className={styles.toastMessage}>{message}</p>
      <button
        className={styles.dismissBtn}
        onClick={handleDismiss}
        data-testid={`close-icon-${id}`}
      >
        {/* <Icon
          customClass={iconClass}
          color="#fff"
          iconName="Close"
          size={18}
          uniqueId={`pace-icon-close-${id}`}
        /> */}
      </button>
      {/* Toast Progress Bar */}
      {toastClosingType === "AUTO" && (
        <div className={styles.toastProgress}>
          <div
            ref={progressRef}
            className={`${styles.toastProgressBar} ${progressBarClass}`}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;

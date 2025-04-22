"use client";

import ToastsContainer from "../components/toastContainer";
import {
  TToastClosingType,
  TToastType,
} from "../components/toastContainer/toastComponent";
import { toastReducer } from "../components/toastContainer/toastReduer";
import { generateUniqueId } from "../lib/utils/helperFunction";
import { createContext, useReducer } from "react";

const initialState = {
  toasts: [],
};

export type TToastContext = {
  successToast?: (
    message: string,
    toastClosingType?: TToastClosingType,
  ) => void;
  warningToast?: (
    message: string,
    toastClosingType?: TToastClosingType,
  ) => void;
  infoToast?: (message: string, toastClosingType?: TToastClosingType) => void;
  errorToast?: (message: string, toastClosingType?: TToastClosingType) => void;
  removeToast?: (message: string, toastClosingType?: TToastClosingType) => void;
};

export const ToastContext = createContext<TToastContext>({});

export const ToastContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (
    type: TToastType,
    message: string,
    toastClosingType?: TToastClosingType,
  ) => {
    const id = generateUniqueId("TOAST");
    dispatch({
      type: "ADD_TOAST",
      payload: {
        id,
        message,
        type,
        toastClosingType: toastClosingType || "AUTO",
      },
    });
    return id;
  };

  const successToast = (
    message: string,
    toastClosingType?: TToastClosingType,
  ) => {
    return addToast("SUCCESS", message, toastClosingType);
  };

  const warningToast = (
    message: string,
    toastClosingType?: TToastClosingType,
  ) => {
    return addToast("WARNING", message, toastClosingType);
  };

  const infoToast = (message: string, toastClosingType?: TToastClosingType) => {
    return addToast("INFO", message, toastClosingType);
  };

  const errorToast = (
    message: string,
    toastClosingType?: TToastClosingType,
  ) => {
    return addToast("ERROR", message, toastClosingType);
  };

  const removeToast = (id: string) => {
    dispatch({ type: "DELETE_TOAST", payload: id });
    return id;
  };

  return (
    <ToastContext.Provider
      value={{
        successToast,
        warningToast,
        infoToast,
        errorToast,
        removeToast,
      }}
    >
      <ToastsContainer toasts={state?.toasts} position="bottomRight" />
      {children}
    </ToastContext.Provider>
  );
};

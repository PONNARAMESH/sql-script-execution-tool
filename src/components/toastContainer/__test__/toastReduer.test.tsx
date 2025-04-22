import { act, renderHook, waitFor } from "@testing-library/react";
import { toastReducer } from "../toastReduer";
import { useReducer } from "react";

describe("Toast reducer", () => {
  test("It should load successfully", () => {
    const { result } = renderHook(() =>
      useReducer(toastReducer, { toasts: [] }),
    );
  });

  test("It should have EMPTY-toast array at initial", () => {
    const { result } = renderHook(() =>
      useReducer(toastReducer, { toasts: [] }),
    );
    const [state] = result.current;
    expect(state.toasts).toHaveLength(0);
  });

  test("dispatching ADD_TOAST state", async () => {
    const { result } = renderHook(() =>
      useReducer(toastReducer, { toasts: [] }),
    );
    const [state, dispatch] = result.current;
    expect(state.toasts).toHaveLength(0);
    act(() => {
      dispatch({
        type: "ADD_TOAST",
        payload: {
          id: "123",
          message: "Something went wrong",
          type: "SUCCESS",
        },
      });
    });
  });

  test("dispatching DELETE_TOAST", async () => {
    const { result } = renderHook(() =>
      useReducer(toastReducer, { toasts: [] }),
    );
    const [state, dispatch] = result.current;
    expect(state.toasts).toHaveLength(0);
    act(() => {
      const id = "123";
      dispatch({ type: "DELETE_TOAST", payload: id });
    });
  });

  test("dispatching other than ADD_TOAST / DELETE_TOAST", async () => {
    try {
      const { result } = renderHook(() =>
        useReducer(toastReducer, { toasts: [] }),
      );
      const [state, dispatch] = result.current;
      expect(state.toasts).toHaveLength(0);
      act(() => {
        dispatch({ type: "UNKNOWN_STATE", payload: {} });
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

import { render, fireEvent, screen } from "@testing-library/react";
import Toast from "../toastComponent";
import { ToastContext } from "@/context/toastContext";

// Mock styles
jest.mock("./styles.module.scss", () => ({
  successToastBGColor: "successToastBGColor",
  successIcon: "successIcon",
  success: "success",
  warningToastBGColor: "warningToastBGColor",
  warningIcon: "warningIcon",
  warning: "warning",
  warningToastFontColor: "warningToastFontColor",
  infoToastBGColor: "infoToastBGColor",
  infoIcon: "infoIcon",
  info: "info",
  errorToastBGColor: "errorToastBGColor",
  errorIcon: "errorIcon",
  error: "error",
  toast: "toast",
  toastMessage: "toastMessage",
  dismissBtn: "dismissBtn",
  toastProgress: "toastProgress",
  toastProgressBar: "toastProgressBar",
}));

// Mock Icon component
jest.mock("@wds/pace-ui", () => ({
  Icon: () => <div />,
}));

describe("Toast Component", () => {
  const removeToastMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders correctly", () => {
    const { container } = render(
      <ToastContext.Provider value={{ removeToast: removeToastMock }}>
        <Toast
          message="Success!"
          type="SUCCESS"
          id="toast1"
          toastClosingType="AUTO"
        />
      </ToastContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it("dismisses automatically after 4 seconds", () => {
    render(
      <ToastContext.Provider value={{ removeToast: removeToastMock }}>
        <Toast
          message="Success!"
          type="SUCCESS"
          id="toast1"
          toastClosingType="AUTO"
        />
      </ToastContext.Provider>,
    );
    expect(removeToastMock).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(4000);
    expect(removeToastMock).toHaveBeenCalledWith("toast1");
  });

  it("pauses dismissal timer on mouse enter and resumes on mouse leave", () => {
    render(
      <ToastContext.Provider value={{ removeToast: removeToastMock }}>
        <Toast
          message="Warning!"
          type="WARNING"
          id="toast2"
          toastClosingType="MANUAL"
        />
      </ToastContext.Provider>,
    );

    fireEvent.mouseEnter(screen.getByTestId("toastMessage"));
    jest.advanceTimersByTime(2000); // Halfway through the timer
    expect(removeToastMock).toHaveBeenCalledTimes(2);

    fireEvent.mouseLeave(screen.getByTestId("toastMessage"));
    jest.advanceTimersByTime(2000); // Remaining time
    expect(removeToastMock).toHaveBeenCalledWith("toast1");
    expect(removeToastMock).toHaveBeenCalledWith("toast1");
  });

  it("dismisses manually when close button is clicked", () => {
    render(
      <ToastContext.Provider value={{ removeToast: removeToastMock }}>
        <Toast
          message="Error!"
          type="ERROR"
          id="toast3"
          toastClosingType="MANUAL"
        />
      </ToastContext.Provider>,
    );

    fireEvent.click(screen.getByTestId(`close-icon-toast3`));
    expect(removeToastMock).toHaveBeenCalledWith("toast3");
  });
});

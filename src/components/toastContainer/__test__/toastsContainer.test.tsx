import { fireEvent, render, screen } from "@testing-library/react";
import ToastsContainer from "../index";
import { ToastContextProvider } from "@/context/toastContext";
import { IToast } from "../toastComponent";

describe("ToastsContainer component", () => {
  describe("It TOAST-array is EMPTY", () => {
    const renderToastContainer = () => {
      render(<ToastsContainer toasts={[]} position="bottomRight" />);
    };

    test("It should render successfully", () => {
      renderToastContainer();
    });

    test("It should contain zero toast-messages in UI", () => {
      renderToastContainer();
      const toastContainer = screen.getByTestId("toastContainer");
      expect(toastContainer).toBeInTheDocument();

      // search for toastMessage
      const toastMessages = screen.queryAllByTestId("toastMessage");
      expect(toastMessages).toHaveLength(0);
    });
  });

  describe("It TOASTS-array if NOT-EMPTY", () => {
    const toastId = "12312";
    const renderToastContainer = () => {
      let toastMessages: IToast[] = [
        {
          id: toastId,
          message: "Something Went wrong",
          type: "ERROR",
        },
      ];
      render(
        <ToastContextProvider>
          <ToastsContainer toasts={toastMessages} position="bottomRight" />
        </ToastContextProvider>,
      );
    };

    test("It should render successfully", () => {
      renderToastContainer();
    });

    test("The Toast message in UI while on handleMouseHover", () => {
      renderToastContainer();
      const onMouseHover = screen.getByTestId("toastMessage");
      fireEvent.mouseOver(onMouseHover);
      expect(onMouseHover).toBeInTheDocument();
    });

    test("The Toast message in UI & It should be closable", () => {
      renderToastContainer();
      const closeIcon = screen.getByTestId(`close-icon-${toastId}`);
      expect(closeIcon).toBeInTheDocument();
      fireEvent.click(closeIcon);
    });

    test("The Toast message in UI While on handleMouseLeave", () => {
      renderToastContainer();
      const onMouseLeave = screen.getByTestId("toastMessage");
      fireEvent.mouseLeave(onMouseLeave);
      expect(onMouseLeave).toBeInTheDocument();
    });

    // test('It should contain some toast-message in UI', () => {
    //   renderToastContainer()
    //   const toastContainer = screen.getByTestId('toastContainer');
    //   expect(toastContainer).toBeInTheDocument();

    //   // search for toastMessage
    //   const toastMessages = screen.getAllByTestId('toastMessage');
    //   expect(toastMessages).toHaveLength(1);
    // })

    // test('The Toast message in UI & It should be closable', () => {
    //   renderToastContainer()
    //   const toastContainer = screen.getByTestId('toastContainer');
    //   expect(toastContainer).toBeInTheDocument();

    //   // search for toastMessage
    //   const toastMessages = screen.getAllByTestId('toastMessage');
    //   expect(toastMessages).toHaveLength(1);

    //   // // find close-icon
    //   // const closeIcon = screen.getByTestId(`close-icon-${toastId}`);
    //   // expect(closeIcon).toBeInTheDocument();
    //   // fireEvent.click(closeIcon);
    // })
  });
});

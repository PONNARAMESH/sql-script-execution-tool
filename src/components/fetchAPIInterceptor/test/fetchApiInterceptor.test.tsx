import { render, waitFor } from "@testing-library/react";
import FetchAPIInterceptor from "../index";
import { ToastContextProvider, ToastContext } from "@/context/toastContext";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(() => []),
}));

const promiseWith200 = Promise.resolve({
  status: 200,
  ok: true,
  url: "http://localhost:6002/sections/DOB-10000000994-CIBG",
  clone: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve({})),
  })),
  headers: new Map([["Content-Type", "application/json; charset=utf-8"]]),
});

const promiseWithFieldLevelErrors400 = Promise.resolve({
  status: 400,
  ok: false,
  url: "http://localhost:6002/sections/DOB-10000000994-CIBG",
  clone: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve({ fieldLevelErrors: true })),
  })),
  headers: new Map([["Content-Type", "application/json; charset=utf-8"]]),
});

const promiseWithNoErrors400 = Promise.resolve({
  status: 400,
  ok: false,
  url: "http://localhost:6002/sections/DOB-10000000994-CIBG",
  clone: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve({})),
  })),
  headers: new Map([["Content-Type", "application/json; charset=utf-8"]]),
});

const promiseWithStatus500 = Promise.resolve({
  status: 500,
  ok: false,
  url: "http://localhost:6002/sections/DOB-10000000994-CIBG",
  clone: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve()),
  })),
  headers: new Map([["Content-Type", "application/json; charset=utf-8"]]),
});

describe("FetchAPIInterceptor", () => {
  let errorToastMock: any;

  beforeEach(() => {
    errorToastMock = jest.fn();
    window.fetch = jest
      .fn()
      .mockReturnValueOnce(promiseWith200)
      .mockReturnValueOnce(promiseWithFieldLevelErrors400)
      .mockReturnValueOnce(promiseWithNoErrors400)
      .mockReturnValueOnce(promiseWithStatus500);
  });

  it("renders without crashing", () => {
    render(
      <ToastContextProvider>
        <FetchAPIInterceptor />
      </ToastContextProvider>,
    );
  });

  it("handles different fetch response scenarios", async () => {
    render(
      <ToastContext.Provider value={{ errorToast: errorToastMock }}>
        <FetchAPIInterceptor />
      </ToastContext.Provider>,
    );

    await fetch("http://localhost:6002/sections/DOB-10000000994-CIBG");
    expect(errorToastMock).not.toHaveBeenCalled();

    await fetch("http://localhost:6002/sections/DOB-10000000994-CIBG");
    expect(errorToastMock).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

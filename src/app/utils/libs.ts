type TFunctionWithEmptyParams = () => void;
/* eslint-disable   @typescript-eslint/no-explicit-any */
type TFunctionWithParams = (...params: any) => void;
export const createDebounceFunction = (
  inputFun: TFunctionWithEmptyParams | TFunctionWithParams,
  delayInSeconds: number,
) => {
  let timerId: NodeJS.Timeout;
  /* eslint-disable   @typescript-eslint/no-explicit-any */
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      inputFun.apply(this, args);
    }, delayInSeconds);
  };
};

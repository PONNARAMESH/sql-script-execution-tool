export const generateUniqueId = (uniqKey: string) => {
  return `${uniqKey}_FE_UNIQUE_ID_${new Date().valueOf()}`;
};

export const copy = (data: any) => {
  return data ? JSON.parse(JSON.stringify(data)) : data;
};

export const convertCamelToNormal = (camelCaseText: string) => {
  const normalText = camelCaseText?.replace(/([A-Z])/g, " $1")?.trim();

  return normalText.charAt(0).toUpperCase() + normalText.slice(1);
};

export const flattenObj = (obj: Record<string, any>) => {
  // The object which contains the
  // final result
  let result: Record<string, any> = {};

  // loop through the object "obj"
  for (const i in obj) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const temp: Record<string, unknown> = flattenObj(obj[i]);
      for (const j in temp) {
        // Store temp in result
        result[i + "." + j] = temp[j];
      }
    }
    // Else store obj[i] in result directly
    else {
      result[i] = obj[i];
    }
  }
  return result;
};

export const encodeUriBase64 = (str: string) => {
  if (str) {
    return encodeURIComponent(btoa(str));
  }
  return "";
};
export const decodeUriBase64 = (endodedStr: string) => {
  if (endodedStr) {
    return decodeURIComponent(atob(decodeURIComponent(endodedStr)));
  }
  return "";
};

export const decodeJWTToken = (jwtToken: any) => {
  let base64Url = jwtToken.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

export const setData = (
  key: string,
  data: object | string | boolean | [] | number,
) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const getData = (key: string) => {
  return localStorage.getItem(key) ? localStorage.getItem(key) : null;
};

export const removeData = (key: string) => {
  localStorage.removeItem(key);
};

export const removeKeysFromObject = (data: any, deletableKeys: any) => {
  deletableKeys.forEach((key: any) => {
    if (key in data) {
      delete data[key];
    }
  });
  return data;
};

export const removeKey = (keyName: any, data: any) => {
  if (data?.constructor === Object) {
    if (keyName in data) {
      delete data[keyName];
    }
  } else if (data?.constructor === Array) {
    data.forEach((d) => {
      return removeKey(keyName, d);
    });
  }
  return data;
};

export const isValidJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

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

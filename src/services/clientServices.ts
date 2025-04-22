export const fetchCall = async (
  url: string,
  method: string,
  headers: HeadersInit,
  data?: any,
  num?: number,
) => {
  let obj: any = {
    method: method,
    headers: headers,
  };
  if (data) {
    obj.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, obj);
    if (!response.ok) {
      throw response.json();
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    let res;
    const erroPromise = error;
    const resolvedError = await error;
    let numb = !num ? 0 : num;
    // if (isInvalidAPIConnectToken(resolvedError) && numb < 1) {
    //   const oldToken = getCookie(CONST_ENUM.API_CONNET_ACCESS_TOKEN_COOKIE);
    //   await updateAPIConnectToken(oldToken || '')
    //     .then(async (newToken) => {
    //       headers = {
    //         ...headers,
    //         Authorization: 'Bearer ' + newToken,
    //         RepeatAuth: String(numb + 1),
    //       };
    //       res = await fetchCall(url, method, headers, data, numb + 1);
    //     })
    //     .catch((err) => {
    //       throw err;
    //     });
    // } else {
    //   throw erroPromise;
    // }
    return res;
  }
};

const getHeaders = () => {
  const journey = "WEB"; // WEB, MOBILE,
  const region = "IND"; // region => country name
  return {
    "Content-Type": "application/json",
    channel: `${journey}`,
    messageId: `${Date.now()}`,
    // authToken: getCookie(CONST_ENUM.AUTH_TOKEN) ?? '',
    region: region,
    action: "portal",
    // Authorization: `Bearer ${getCookie(CONST_ENUM.API_CONNET_ACCESS_TOKEN_COOKIE)}`,
    // clientId: getEnvData(API.API_CONNECT_CLIENT_ID),
  };
};

export const getQueryResult = async (queries: string | string[]) => {
  const data = { queries };
  const headers = getHeaders();
  // const url = `${envData.env.baseUrl}/query`;
  const url = "http://localhost:6003/query";
  const result = await fetchCall(url, "POST", headers, data);
  return result;
};

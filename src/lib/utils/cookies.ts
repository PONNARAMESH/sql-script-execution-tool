export const getCookie = (name: any) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(name + "="));

  if (cookieValue) {
    return cookieValue.split("=")[1];
  }
  return null; // Return null if the cookie is not found
};
export const setCookie = (
  key: string,
  data: string | boolean,
  _expiresCookie?: Date | number,
) => {
  const aYearFromNow = new Date();
  aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
  document.cookie = `${key}=${data}; expires=${aYearFromNow} UTC; path=/; sameSite: Lax;`;
};
export const removeCookie = (key: string) => {
  if (getCookie(key)) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
  }
};
export const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
  });
  return;
};

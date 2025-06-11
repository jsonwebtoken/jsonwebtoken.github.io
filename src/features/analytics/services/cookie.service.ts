export const setCookie = (name: string, value: string, ms?: number): void => {
  let expires = "";

  if (ms) {
    const date = new Date();
    date.setTime(date.getTime() + ms);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${encodeURIComponent(
    value || "",
  )}${expires}; path=/`;
};

export const getCookie = (cname: string): string => {
  const name = `${cname}=`;
  // TODO: What is ca? Document this better.
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];

    if (!c) {
      continue;
    }

    while (c.charAt(0) === " ") c = c.substring(1);

    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }

  return "";
};

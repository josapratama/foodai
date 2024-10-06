import { serialize, CookieSerializeOptions } from "cookie";

export const setCookie = (
  name: string,
  value: string,
  options: CookieSerializeOptions
) => {
  return serialize(name, value, options);
};

import { join } from "path";

export const AUTH0_SIGNUP_URL =
  "https://auth0.com/signup/?utm_source=jwt.io&utm_medium=microsites&utm_campaign=devn_signup";
export const AUTH0_SIGNUP_URL_JA =
  "https://auth0.com/jp/signup/?utm_source=jwtio&utm_medium=microsites&utm_campaign=devn-signups";

export const DATA_DIR = "data";
export const SRC_DIR = "src";
export const DATA_PATH = join(process.cwd(), SRC_DIR, DATA_DIR);

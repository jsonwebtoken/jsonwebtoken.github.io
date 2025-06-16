import {
  getCookie,
  setCookie,
} from "@/features/analytics/services/cookie.service";

const getExpiryInDays = (days: number) => 60 * 60 * 24 * 1000 * days;

const getPage = () => window.location.pathname;

const getTodayDate = () =>
  new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

export const saveUTM = () => {
  const gtmCookies: string[] = [
    "utm_id",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "ocid",
  ];

  const utmValues: any = {};
  const sessionUtmCookie = getCookie("_okta_session_attribution");
  const sessionUtmValues: any = {};
  const originalUtmCookie = getCookie("_okta_original_attribution");
  const originalUtmValues: any = {};

  const urlParams = new URLSearchParams(window.location.search);
  for (let i = 0; i < gtmCookies.length; i += 1) {
    const gtmCookie = gtmCookies[i];

    if (!gtmCookie) {
      continue;
    }

    const queryValue = urlParams.get(gtmCookie);

    if (queryValue) {
      utmValues[gtmCookie] = queryValue;
      if (!sessionUtmCookie) {
        sessionUtmValues[gtmCookie] = queryValue;
      }
      if (!originalUtmCookie) {
        originalUtmValues[gtmCookie] = queryValue;
      }
    }
  }

  utmValues.utm_page = getPage();
  utmValues.utm_date = getTodayDate();

  if (!sessionUtmCookie) {
    sessionUtmValues.utm_page = getPage();
    sessionUtmValues.utm_date = getTodayDate();
  }

  if (!originalUtmCookie) {
    originalUtmValues.utm_page = getPage();
    originalUtmValues.utm_date = getTodayDate();
  }

  setCookie("_okta_attribution", JSON.stringify(utmValues));
  if (!sessionUtmCookie) {
    setCookie("_okta_session_attribution", JSON.stringify(sessionUtmValues));
  }
  if (!originalUtmCookie) {
    setCookie(
      "_okta_original_attribution",
      JSON.stringify(originalUtmValues),
      getExpiryInDays(365),
    );
  }

  const GCLID_COOKIE = "gclid";

  const gdlidCookie = urlParams.get(GCLID_COOKIE);

  if (gdlidCookie && !getCookie(GCLID_COOKIE)) {
    setCookie(GCLID_COOKIE, gdlidCookie, getExpiryInDays(365));
  }
};

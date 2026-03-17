import Script from 'next/script';

const AdobeAnalyticsScript = () => {
  const source = process.env.NEXT_PUBLIC_ADOBE_ANALYTICS_URL;
  return source ? (
    <Script type="text/javascript" src={source} charSet="UTF-8" async></Script>
  ) : null;
};

export default AdobeAnalyticsScript;
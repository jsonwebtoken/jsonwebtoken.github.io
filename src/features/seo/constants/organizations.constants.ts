import { OrganizationStructuredDataModel } from "@/features/seo/models/organization-structured-data.model";

export const AUTH0_ORGANIZATION: OrganizationStructuredDataModel = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Auth0",
  legalName: "Auth0 Inc.",
  url: "https://auth0.com/",
  logo: "https://cdn.auth0.com/website/assets/pages/press/img/resources/auth0-logo-main-6001cece68.svg",
  foundingDate: "2013",
  sameAs: [
    "https://twitter.com/auth0",
    "https://www.facebook.com/getauth0/",
    "https://www.linkedin.com/company/auth0",
  ],
};

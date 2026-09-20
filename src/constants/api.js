/**
 * API base URL for the contact-form mail service.
 *
 * Development: leave REACT_APP_API_URL unset. The CRA dev server proxies
 *              /api/* to http://localhost:5001 (see "proxy" in package.json).
 * Production:  set REACT_APP_API_URL to the deployed API origin, e.g.
 *              REACT_APP_API_URL=https://api.rufarodev.com
 */
export const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

export const CONTACT_ENDPOINT = `${API_BASE}/api/contact`;
export const QUOTE_ENDPOINT = `${API_BASE}/api/quote`;

/** Public contact details, kept in one place. */
export const CONTACT = {
  email: "mucherinvest@gmail.com",
  location: "Calgary, Alberta, Canada",
  timezone: "America/Edmonton",
  github: "https://github.com/rufustech/",
  linkedin: "https://www.linkedin.com/in/rmucheri",
};

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',

  // Leads — paths match the backend exactly
  LEADS_ALL: '/leads/all',
  LEADS_CREATE: '/leads/create',
  LEAD_BY_ID: '/leads/',    // ?id= query param
  LEAD_UPDATE: '/leads/',   // ?id= query param (PATCH)
  LEAD_DELETE: '/leads/',   // ?id= query param (DELETE)
} as const;

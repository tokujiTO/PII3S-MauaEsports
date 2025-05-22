import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID || 'default-client-id',
    authority:
      'https://login.microsoftonline.com/' +
      import.meta.env.VITE_TENANT_ID,
    redirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage', // Armazena o token na LocalStorage
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};

export const msalInstance = new PublicClientApplication(msalConfig);

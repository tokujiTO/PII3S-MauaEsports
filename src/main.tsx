import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './auth/authConfi.ts';
import { TrainsProvider } from './context/trainsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrainsProvider>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </TrainsProvider>
  </StrictMode>
);

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes';
import { UiProvider } from '../context/ui';
import { AuthProvider } from '../context/auth';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
      }}
    >
      <AuthProvider>
        <UiProvider>
          <ThemeProvider theme={ lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default MyApp

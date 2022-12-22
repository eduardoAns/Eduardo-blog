import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes';
import { UiProvider } from '../context/ui';
import { AuthProvider } from '../context/auth';
import { SWRConfig } from 'swr';
import { BlogProvider } from '../context/blog';
import { ComentProvider } from '../context/coment';
import { UserProvider } from '../context/user';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
      }}
    >
      <AuthProvider>
        <UiProvider>
          <UserProvider>
            <BlogProvider>
              <ComentProvider>
                <ThemeProvider theme={ lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
              </ComentProvider>
            </BlogProvider>
          </UserProvider>
        </UiProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default MyApp

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes';
import { UiProvider } from '../context/ui';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UiProvider>

      <ThemeProvider theme={ lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>

    </UiProvider>
  )
}

export default MyApp

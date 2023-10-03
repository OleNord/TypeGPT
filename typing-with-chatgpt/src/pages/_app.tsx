// pages/_app.tsx
import type { AppProps } from 'next/app';
import { GameModeProvider } from '../app/contexts/gameModeContext';
import '../app/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameModeProvider>
      <Component {...pageProps} />
    </GameModeProvider>
  );
}

export default MyApp;
import "../styles/globals.css";
import { ThemeContextProvider } from '../context/state';
import AppContainer from '../components/AppContainer';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ThemeContextProvider>
  );
}

export default MyApp;

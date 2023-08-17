import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from 'web3uikit';
import 'animate.css/animate.min.css';
import '../styles/globals.css';
import { GlobalVariables } from '../components/GlobalVariables';

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <GlobalVariables>
          <Component {...pageProps} />
        </GlobalVariables>
      </NotificationProvider>
    </MoralisProvider>
  );
}

export default MyApp;

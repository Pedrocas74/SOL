import './globals.css';
import Navbar from '../components/Navbar';
import ReduxProvider from '../components/ReduxProvider';
import Footer from '@components/Footer';


export const metadata = {
  title: 'Redux Shop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{overflowX: "hidden"}}>
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}

import './globals.css';
import Navbar from '../components/Navbar';
import ReduxProvider from '../components/ReduxProvider';

export const metadata = {
  title: 'Redux Shop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}

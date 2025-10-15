import './globals.css';
// import Navbar from '../components/Navbar';
import ReduxProvider from '../components/ReduxProvider';
// import Footer from '@components/Footer';

import { Titillium_Web, Lexend } from "next/font/google";

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['300','400','600','700','900'],
  display: 'swap', 
  variable: '--font-titillium',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  display: 'swap', 
  variable: '--font-lexend',
});

export const metadata = { //title of the app
  title: 'Redux Shop',
  description: 'Awesome e-commerce store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${titillium.variable} ${lexend.variable}`} >
        <ReduxProvider>
          <main>{children}</main>
          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}

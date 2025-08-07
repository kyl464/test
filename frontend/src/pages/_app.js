import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"; // <-- tambahkan ini
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {" "}
      {/* <-- Bungkus semua */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

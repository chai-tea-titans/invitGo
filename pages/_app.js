
import "../styles/globals.css";
import { useState } from "react";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "./api/store/store";

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
      </SessionProvider>
    </Provider>
  );
}

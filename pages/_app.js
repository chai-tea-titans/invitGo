
//  OLD CODE
// import '../styles/globals.css'
// import { SessionProvider } from "next-auth/react"

// export default function App({Component, pageProps }) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }


// NEW CODE FOR USING REDUX / STORE
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux';
import store from '../server/store/store'

export default function App({Component, pageProps }) {
  return (
    <Provider store={store}>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
    </Provider>

  )
}
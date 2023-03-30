import NextAuth from "next-auth"

import GoogleProvider from 'next-auth/providers/google'


export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId:'26677468679-gtoes9rie186g9nsa8l8quu52obq4hoa.apps.googleusercontent.com',
      clientSecret:'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'
    }),
    // ...add more providers here
  ],
})
import NextAuth from "next-auth"

import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider  from "next-auth/providers/credentials"
import axios from "axios"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_ID,
      clientSecret:process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const { data } = await axios.post('http://localhost:8080/api/users/login', {
            username: credentials.username,
            password: credentials.password,
          });

          if (data.accessToken) {
            return { name: credentials.username, accessToken: data.accessToken };
          } else {
            throw new Error('Unable to login');
          }
        } catch (error) {
          throw new Error('Unable to login');
        }
      },
    }),
  ],

  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      session.accessToken = token.accessToken;
      return Promise.resolve(session);
    },
  },

  // pages: {
  //   signIn: '/login',
  //   signOut: '/logout',
  //   error: '/login',
  // },

  database: process.env.DATABASE_URL,
})

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from '@auth/core/jwt';
import type { Provider } from 'next-auth/providers';

interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {
        type: 'email',
        label: 'Email',
        // placeholder: 'johndoe@gmail.com',
      },
      password: {
        type: 'password',
        label: 'Password',
        // placeholder: '*****',
      },
    },
    authorize: async (credentials) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        const data = await response.json();

        return {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          tokenType: data.tokenType,
          expiresIn: data.expiresIn,
        };
      } catch (e) {
        return null;
      }
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: LoginResponse }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType;
        token.expiresIn = user.expiresIn;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (!session.user) session.user = {};

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.tokenType = token.tokenType;
      session.user.expiresIn = token.expiresIn;
      return session;
    },
  },
});

import NextAuth, { User, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import type { Provider } from 'next-auth/providers';
import { refreshAccessToken, RefreshTokenError } from '@/core/server/refresh';
import { login } from '@/core/server/login';

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {
        type: 'email',
        label: 'Email',
        placeholder: 'johndoe@gmail.com',
      },
      password: {
        type: 'password',
        label: 'Password',
        placeholder: '*****',
      },
    },
    authorize: async (credentials) => {
      try {
        // const adminCred = {
        //   email: 'administrator',
        //   password: 'Kenya2019%',
        // };
        const data = await login(credentials);
        // const data = await login(adminCred);

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
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType;
        token.expiresAt = Date.now() + user.expiresIn * 1000;
      }
      if (!token.expiresAt || !token.refreshToken) return token;

      if (Date.now() < (token.expiresAt as number) - 60000) return token;

      try {
        const res = await refreshAccessToken(token.refreshToken as string);
        token.accessToken = res.accessToken;
        token.refreshToken = res.refreshToken;
        token.tokenType = res.tokenType;
        token.expiresAt = res.accessTokenExpiresAt;
      } catch (err) {
        const e = err as unknown;
        token.refreshError =
          e instanceof RefreshTokenError ? e.message : 'RefreshFailed';
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!session.user) session.user = {};

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.tokenType = token.tokenType;
      session.user.expiresIn = token.expiresIn;
      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      accessToken?: string;
      refreshToken?: string;
      tokenType?: string;
      expiresIn?: number;
    };
  }
  interface User {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    sub: string;
  }
}

import NextAuth, { User, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import type { Provider } from 'next-auth/providers';
import { refreshAccessToken, RefreshTokenError } from '@/core/server/refresh';
import { socialLogin } from '@/core/server/login';
import { Token } from '@/core/common/interfaces/token';

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    profile: async (profile): Promise<Token> => {
      const { email, name } = profile;
      const username =
        name?.replace(/\s+/g, '').toLowerCase() || email.split('@')[0];
      try {
        const data = await socialLogin({ username, email });
        return {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          tokenType: data.tokenType,
          expiresIn: data.expiresIn,
        };
      } catch (error) {
        console.log('error', error);
        return null as unknown as Token;
      }
    },
  }),
  // Credentials({
  //   credentials: {
  //     email: {
  //       type: 'email',
  //       label: 'Email',
  //       placeholder: 'johndoe@gmail.com',
  //     },
  //     password: {
  //       type: 'password',
  //       label: 'Password',
  //       placeholder: '*****',
  //     },
  //   },
  //   authorize: async (credentials) => {
  //     try {
  //       const data = await login(credentials);
  //       return {
  //         accessToken: data.accessToken,
  //         refreshToken: data.refreshToken,
  //         tokenType: data.tokenType,
  //         expiresIn: data.expiresIn,
  //       };
  //     } catch (error) {
  //       console.log('error', error);
  //       return null;
  //     }
  //   },
  // }),
];

export const { handlers, auth } = NextAuth({
  providers,
  pages: {
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType;
        token.expiresAt = Date.now() + user.expiresIn * 60 * 1000;

        const decoded = safeDecodeJwt<{ sub?: string }>(
          String(token.accessToken)
        );
        if (decoded?.sub) token.sub = decoded.sub;
      }
      if (!token.expiresAt || !token.refreshToken) {
        return token;
      }
      if (Date.now() < (token.expiresAt as number) - 60000) {
        return token;
      }

      try {
        const res = await refreshAccessToken(token.refreshToken as string);
        token.accessToken = res.accessToken;
        token.refreshToken = res.refreshToken;
        token.tokenType = res.tokenType;
        token.expiresAt = Date.now() + res.expiresIn * 60 * 1000;
      } catch (err) {
        const e = err as unknown;
        token.refreshError =
          e instanceof RefreshTokenError ? e.message : 'RefreshFailed';
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!session.user) session.user = {};
      // Expose the authenticated user's id on the session
      if (token?.sub) {
        session.user.id = token.sub;
      }
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

function safeDecodeJwt<T = string>(jwt: string): T | null {
  try {
    const [, payload] = jwt.split('.');
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // atob is available in Edge runtime
    const json = atob(base64);
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

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

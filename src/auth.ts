import NextAuth, { User, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';
import type { Provider } from 'next-auth/providers';
import { refreshAccessToken, RefreshTokenError } from '@/core/services/refresh';
import { socialLogin } from '@/core/services/login';
import { Token } from '@/core/common/interfaces/token';

interface JwtDecode {
  id: string;
  picture: string;
}
const decodeJWT = (accessToken: string): JwtDecode | undefined => {
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    );
    return {
      id: payload.userId || payload.sub || payload.id,
      picture: payload.picture,
    };
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return undefined;
  }
};

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorization: {
      params: {
        scope: 'openid email profile',
        prompt: 'consent', // Forces the consent screen to show every time
        access_type: 'offline', // Ensures a refresh token is issued (important for future API calls)
        response_type: 'code',
      },
    },
    profile: async (profile): Promise<Token> => {
      const { email, name, picture } = profile;
      const username =
        name?.replace(/\s+/g, '').toLowerCase() || email.split('@')[0];
      try {
        const data = await socialLogin({ username, email, picture });
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
        const decodedJwt = decodeJWT(user.accessToken);
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType;
        token.expiresAt = Date.now() + user.expiresIn * 60 * 1000;
        // token.userId = decodeJWT(user.accessToken);
        token.userId = decodedJwt?.id;
        token.picture = decodedJwt?.picture;
        return token;
      }
      if (!token.expiresAt || !token.refreshToken) {
        return token;
      }
      if (Date.now() < (token.expiresAt as number) - 60000) {
        return token;
      }

      try {
        const res = await refreshAccessToken(token.refreshToken as string);
        const decodedJwt = decodeJWT(res.accessToken);
        token.accessToken = res.accessToken;
        token.refreshToken = res.refreshToken;
        token.tokenType = res.tokenType;
        token.expiresAt = Date.now() + res.expiresIn * 60 * 1000;
        // token.userId = decodeJWT(res.accessToken);
        token.userId = decodedJwt?.id;
        token.picture = decodedJwt?.picture;
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
      session.user.id = token.userId || token.sub;
      session.user.picture = token.picture || '';
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
      picture?: string;
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
    userId?: string;
  }
}

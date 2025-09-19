import 'server-only';
import { Token } from '@/core/common/interfaces/token';

export class RefreshTokenError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'RefreshTokenError';
  }
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresAt: number; // epoch ms
}> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    }
  );

  if (!resp.ok) {
    throw new RefreshTokenError('Refresh call failed', resp.status);
  }

  const data = (await resp.json()) as Token;
  if (!data?.accessToken || !data?.expiresIn) {
    throw new RefreshTokenError('Invalid refresh payload');
  }

  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    tokenType: data.tokenType,
    accessTokenExpiresAt: Date.now() + data.expiresIn * 1000,
  };
}

// import 'server-only';
import { Token } from '@/core/common/interfaces/token';
import { ApiResponseWithData } from '@/core/common/interfaces/ApiResponse';

export class RefreshTokenError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'RefreshTokenError';
  }
}

export async function refreshAccessToken(payload: string): Promise<{
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number; // epoch ms
}> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ refreshToken: payload }),
      cache: 'no-store',
    }
  );

  if (!resp.ok) {
    throw new RefreshTokenError('Refresh call failed', resp.status);
  }

  const result: ApiResponseWithData<Token> = await resp.json();
  const { tokenType, accessToken, refreshToken, expiresIn } = result.data;

  if (!accessToken || !expiresIn) {
    throw new RefreshTokenError('Invalid refresh payload');
  }

  return {
    accessToken,
    refreshToken,
    tokenType,
    expiresIn,
  };
}

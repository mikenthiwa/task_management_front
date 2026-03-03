import { Token } from '@/core/common/interfaces/token';
import { ApiResponseWithData } from '@/core/common/interfaces/ApiResponse';

export const socialLogin = async (payload: {
  username: string;
  email: string;
  picture: string;
}): Promise<Token> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/social-login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
  const result: ApiResponseWithData<Token> = await response.json();
  const { tokenType, accessToken, refreshToken, expiresIn } = result.data;
  return {
    accessToken,
    refreshToken,
    tokenType,
    expiresIn,
  };
};

import { z } from 'zod';
import { Token } from '@/core/common/interfaces/token';
import { ApiResponseWithData } from '@/core/common/interfaces/ApiResponse';

export const signInSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const login = async (
  credentials: Partial<Record<'email' | 'password', unknown>>
): Promise<Token> => {
  const { email, password } = await signInSchema.parseAsync(credentials);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
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
};

export const socialLogin = async (payload: {
  username: string;
  email: string;
}): Promise<Token> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social-login`,
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

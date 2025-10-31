import { z } from 'zod';
import { Token } from '@/core/common/interfaces/token';

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

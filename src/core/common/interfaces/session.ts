export interface Session {
  user: {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
  };
  expires: string;
}

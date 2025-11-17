import Link from 'next/link';
import { ErrorRounded } from '@mui/icons-material';

const ERROR_COPY: Record<string, { title: string; description: string }> = {
  AccessDenied: {
    title: 'Access denied',
    description:
      'Your account is missing the permissions needed to reach this area. Try again with a different account or contact an administrator.',
  },
  CredentialsSignin: {
    title: 'Incorrect email or password',
    description:
      'We could not match those credentials. Double-check your email and password, then try signing in again.',
  },
  OAuthSignin: {
    title: 'Could not start single sign-on',
    description:
      'Google did not let us start the sign-in flow. Please retry in a moment.',
  },
  OAuthCallback: {
    title: 'Single sign-on failed to complete',
    description:
      'We ran into an issue while finishing Google sign-in. Give it another try or switch to email login.',
  },
  Configuration: {
    title: 'Authentication is not configured correctly',
    description:
      'An internal configuration issue blocked the login flow. Please let the support team know so we can fix it.',
  },
  Default: {
    title: 'We could not log you in',
    description:
      'Something unexpected happened while trying to sign you in. Please try again and contact support if the issue persists.',
  },
};

type AuthErrorPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  const params = await searchParams;
  const errorKey = params?.error ?? 'Default';
  const copy = ERROR_COPY[errorKey] ?? ERROR_COPY.Default;

  return (
    <main className='flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground'>
      <section className='w-full max-w-xl rounded-2xl border border-neutral bg-background/95 p-8 text-center shadow-xl shadow-neutral/60 backdrop-blur'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral text-error'>
          <ErrorRounded />
        </div>
        <div className='mt-6 space-y-3'>
          <h1 className='text-2xl font-semibold text-foreground'>
            {copy.title}
          </h1>
          <p className='text-sm text-foreground/70'>{copy.description}</p>
          {errorKey !== 'Default' && (
            <p className='text-xs font-medium uppercase tracking-wider text-neutral-strong'>
              Error code: {errorKey}
            </p>
          )}
        </div>
        <div className='mt-8 flex w-full flex-col gap-3 sm:flex-row'>
          <Link
            href='/api/auth/signin'
            className='inline-flex w-full items-center justify-center rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-500'
          >
            Try again
          </Link>
          <Link
            href='/'
            className='inline-flex w-full items-center justify-center rounded-lg border border-neutral px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-neutral/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-neutral-strong'
          >
            Go home
          </Link>
        </div>
      </section>
    </main>
  );
}

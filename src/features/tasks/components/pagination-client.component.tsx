'use client';
import { Pagination } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function PaginationClient({
  count,
  page,
}: {
  count: number;
  page: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (_: unknown, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('pageNumber', value.toString());
    router.push(`${pathname}?${params}`);
  };

  return <Pagination count={count} page={page} onChange={handleChange} />;
}

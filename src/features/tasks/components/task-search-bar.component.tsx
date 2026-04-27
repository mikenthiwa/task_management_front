'use client';
import { useEffect, useMemo, useState } from 'react';
import { TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function TaskSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(() => searchParams.get('searchTerm') || '', [searchParams]);
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (!value.trim()) {
        params.delete('searchTerm');
      } else {
        params.set('searchTerm', value.trim());
        // reset pagination when searching
        params.set('pageNumber', '1');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const clear = () => setValue('');

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      size='small'
      placeholder='Search tasks...'
      aria-label='Search tasks'
      fullWidth
      sx={{ minWidth: 260 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon fontSize='small' />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position='end'>
            <Tooltip title='Clear search'>
              <IconButton aria-label='Clear search' size='small' onClick={clear}>
                <CloseIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
}

'use client';

import { useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useGenerateReportMutation } from '@/core/services/report';
import { endOfDay, format, formatISO, parseISO, startOfDay } from 'date-fns';

type DateRange = {
  from: string;
  to: string;
};

export const ReportModalComponent = () => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: '',
    to: '',
  });
  const [validationError, setValidationError] = useState('');

  const [generateReport, { isLoading }] = useGenerateReportMutation();
  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);

  const resetForm = () => {
    setDateRange({ from: '', to: '' });
    setValidationError('');
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleDateChange =
    (field: keyof DateRange) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
        setValidationError('');
      };

  const isRangeValid = useMemo(() => {
    const { from, to } = dateRange;
    if (!from || !to) return false;

    try {
      const fromTime = startOfDay(parseISO(from)).getTime();
      const toTime = endOfDay(parseISO(to)).getTime();

      if (Number.isNaN(fromTime) || Number.isNaN(toTime)) return false;
      return fromTime <= toTime;
    } catch (_error) {
      return false;
    }
  }, [dateRange]);

  const isGenerateDisabled =
    !dateRange.from || !dateRange.to || !isRangeValid || isLoading;

  const handleGenerate = async () => {
    if (!isRangeValid) {
      setValidationError('Please select a valid date range.');
      return;
    }

    try {
      await generateReport({
        from: startOfDay(parseISO(dateRange.from)).toISOString(),
        to: endOfDay(parseISO(dateRange.to)).toISOString(),
      }).unwrap();
      handleClose();
    } catch {
      // Global RTK error handling still applies
      setValidationError('Failed to generate report. Please try again.');
    }
  };

  const hasRangeError = Boolean(
    dateRange.from && dateRange.to && !isRangeValid
  );

  return (
    <>
      <Button
        variant='outlined'
        size='small'
        onClick={() => setOpen(true)}
        data-testid='open-generate-report-button'
      >
        Generate Report
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='generate-report-title'
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle id='generate-report-title' className='text-center'>
          Generate Report
        </DialogTitle>

        <DialogContent>
          {validationError && (
            <Alert severity='error' className='mb-3'>
              {validationError}
            </Alert>
          )}

          <Stack spacing={2} className='pt-1'>
            <TextField
              type='date'
              label='From'
              fullWidth
              size='small'
              value={dateRange.from}
              onChange={handleDateChange('from')}
              error={hasRangeError}
              helperText={
                hasRangeError ? 'From date must be on or before To date' : ''
              }
              slotProps={{
                htmlInput: {
                  max: today,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
              data-testid='report-from-date'
            />

            <TextField
              type="date"
              label="To"
              fullWidth
              size="small"
              value={dateRange.to}
              onChange={handleDateChange('to')}
              error={hasRangeError}
              helperText={
                hasRangeError ? 'To date must be on or after From date' : ''
              }
              slotProps={{
                htmlInput: {
                  max: today,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
              data-testid="report-to-date"
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Box className='flex w-full justify-between px-3 pb-2'>
            <Button
              onClick={handleClose}
              variant='outlined'
              size='small'
              data-testid='close-generate-report-button'
            >
              Cancel
            </Button>

            <LoadingButton
              onClick={handleGenerate}
              variant='contained'
              size='small'
              disabled={isGenerateDisabled}
              loading={isLoading}
              data-testid='submit-generate-report-button'
            >
              Generate
            </LoadingButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

'use client';
import React, { useState, ChangeEvent } from 'react';
import * as zod from 'zod';

import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAddTaskMutation } from '@/core/services/task';
import { useRouter } from 'next/navigation';

const TaskSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  description: zod.string().min(1, 'Description is required'),
});

export const TaskModalComponent = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [addTask, { isLoading }] = useAddTaskMutation();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpen = () => {
    setSubmissionError(null);
    setOpen(true);
  };

  const handleClose = () => {
    setSubmissionError(null);
    setOpen(false);
  };

  const submitForm = async () => {
    setSubmissionError(null);
    const result = TaskSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[String(err.path[0])] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      await addTask(result.data).unwrap();
      setFormData({ title: '', description: '' });
      setSubmissionError(null);
      setOpen(false);
      router.refresh();
    }
  };

  const isFormValid = TaskSchema.safeParse(formData).success;

  return (
    <>
      <Button
        variant='outlined'
        className='bg-primary'
        onClick={handleOpen}
        data-testid='open-create-task-button'
        size='small'
      >
        Create Task
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='create-task-title'
      >
        <DialogTitle
          id='create-task-title'
          data-testid='create-task-title'
          className='text-center'
        >
          Create Task
        </DialogTitle>

        <DialogContent>
          {submissionError && <Alert severity='error'>{submissionError}</Alert>}
          <form>
            <TextField
              name='title'
              label='Task Title'
              size='small'
              fullWidth
              margin='normal'
              value={formData['title']}
              onChange={handleChange}
              error={!!errors['title']}
              helperText={errors['title']}
            />
            <TextField
              name='description'
              label='Task Description'
              fullWidth
              margin='normal'
              size='small'
              value={formData['description']}
              onChange={handleChange}
              error={!!errors['description']}
              helperText={errors['description']}
              multiline
              rows={4}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            data-testid='close-create-task-button'
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={submitForm}
            data-testid='submit-create-task-button'
            variant='contained'
            disabled={!isFormValid}
            loading={isLoading}
            size='small'
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

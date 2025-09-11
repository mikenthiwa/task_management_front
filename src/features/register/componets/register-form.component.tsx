'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  TextField,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useAddUserMutation } from '@/core/services/users';
import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(6, 'Too Short!')
    .required('Required')
    .matches(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    )
    .matches(/[0-9]/, 'Password must contain at least one number'),
});

const RegisterFormComponent = () => {
  const [mode, setMode] = useState<'Register' | 'Login'>('Register');
  const [addUser, { isLoading }] = useAddUserMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => SubmitForm(values),
  });

  const SubmitForm = async (values: { email: string; password: string }) => {
    const result = await addUser(values);
    if (result.data === null) setMode('Login');
  };

  return (
    <Box
      bgcolor='white'
      px={4}
      py={4}
      borderRadius={2}
      boxShadow={3}
      mx='auto'
      display='flex'
      flexDirection='column'
      gap={3}
    >
      <ToggleButtonGroup
        color='primary'
        size='small'
        fullWidth
        value={mode}
        exclusive
        onChange={(e, value) => setMode(value)}
      >
        <ToggleButton value='Register'>Register</ToggleButton>
        <ToggleButton value='Login'>Login</ToggleButton>
      </ToggleButtonGroup>

      <form onSubmit={formik.handleSubmit}>
        <Box className='flex flex-col gap-4' width='100%'>
          <TextField
            id='email'
            name='email'
            label='Email'
            variant='outlined'
            size='small'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id='password'
            name='password'
            label='Password'
            variant='outlined'
            size='small'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type='submit' variant='contained' disabled={isLoading}>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterFormComponent;

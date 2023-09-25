import React from 'react';
import {Typography, Paper } from '@mui/material';

import Link from '@mui/material/Link';

export function Footer(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://dannkol.github.io/portafolios/">
          Dannkol
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
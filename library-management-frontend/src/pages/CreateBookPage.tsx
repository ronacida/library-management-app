import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import { createBook } from '@/services/api';

const CreateBookPage: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      await createBook({ name });
      setSuccess(true);
      setError(null);
      setName('');
    } catch (err: any) {
      setError(err.responseData?.message || 'Failed to create book');
      setSuccess(false);
    }
  };

  return (
    <Paper className="p-8">
      <Typography variant="h4" className="mb-4">Create Book</Typography>
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">Book created successfully!</Alert>}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Create Book</Button>
    </Paper>
  );
};

export default CreateBookPage;

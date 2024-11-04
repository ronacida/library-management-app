import React, { useEffect } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import CardGrid from '@/components/CardGrid';
import { Typography } from '@mui/material';
import { UserDTO } from '@/interfaces/User';

const UsersPage: React.FC = () => {
  const { users, error } = useUserContext();

  useEffect(() => {
    if (error) {
      console.error('Error loading users:', error);
    }
  }, [error]);

  return (
    <CardGrid
      items={users}
      title="Users"
      linkPath={(user: UserDTO) => `/users/${user.id}`}
      renderItemContent={(user) => (
        <>
          <Typography variant="h6" className="font-semibold">
            ID: {user.id}
          </Typography>
          <Typography variant="body1" className="text-gray-700 mb-2">
            Name: {user.name}
          </Typography>
        </>
      )}
      error={error}
    />
  );
};

export default UsersPage;

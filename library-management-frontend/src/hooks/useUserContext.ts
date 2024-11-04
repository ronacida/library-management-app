import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useUserContext = () => {
  const context = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return { ...context, error, setError };
};

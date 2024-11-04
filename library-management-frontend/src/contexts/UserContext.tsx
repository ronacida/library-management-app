// contexts/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { UserDetails, UserDTO } from '@/interfaces/User';
import { fetchUsers, fetchUserDetails, ApiError } from '@/services/api';

interface UserContextType {
  users: UserDTO[];
  userDetails: UserDetails | null;
  loadUsers: () => Promise<void>;
  loadUserDetails: (id: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Error loading users: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }, []);

  const loadUserDetails = useCallback(async (id: number) => {
    try {
      const details = await fetchUserDetails(id);
      setUserDetails(details);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Error loading user details: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const contextValue = useMemo(
    () => ({
      users,
      userDetails,
      loadUsers,
      loadUserDetails,
    }),
    [users, userDetails, loadUsers, loadUserDetails]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

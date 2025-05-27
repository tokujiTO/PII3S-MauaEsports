import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  area: string;
  cargo: string;
  nickname: string;
  nome: string;
  p_id: number;
  ra: string;
  __v: number;
  _id: string;
}

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

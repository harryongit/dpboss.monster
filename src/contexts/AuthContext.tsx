import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isUserAuthenticated: boolean;
  username: string | null;
  userUsername: string | null;
  setAdminSession: (user: { id: number }) => void;
  setUserSession: (user: { id: number; username: string; mobile: string; email: string; status: number }) => void;
  logout: () => void;
  ready: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userUsername, setUserUsername] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedAdminAuth = localStorage.getItem('isAuthenticated');
    const savedAdminname = localStorage.getItem('adminname');
    const savedUserAuth = localStorage.getItem('isUserAuthenticated');
    const savedUserUsername = localStorage.getItem('userUsername');
    const savedAdmin = localStorage.getItem('admin');
    const savedUser = localStorage.getItem('user');
    if (savedAdminAuth === 'true' && savedAdminname) {
      setIsAuthenticated(true);
      setUsername(savedAdminname);
    }
    if (savedAdminAuth === 'true' && savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        if (parsed?.id) {
          setIsAuthenticated(true);
          setUsername('admin');
        }
      } catch {
        void 0;
      }
    }
    if (savedUserAuth === 'true' && savedUserUsername) {
      setIsUserAuthenticated(true);
      setUserUsername(savedUserUsername);
    }
    if (savedUserAuth === 'true' && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.username) {
          setIsUserAuthenticated(true);
          setUserUsername(parsed.username);
        }
      } catch {
        void 0;
      }
    }
    setReady(true);
  }, []);

  const setAdminSession = (user: { id: number }) => {
    setIsAuthenticated(true);
    setUsername('admin');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('adminname', 'admin');
    localStorage.setItem('admin', JSON.stringify(user));
  };

  const setUserSession = (user: { id: number; username: string; mobile: string; email: string; status: number }) => {
    setIsUserAuthenticated(true);
    setUserUsername(user.username);
    localStorage.setItem('isUserAuthenticated', 'true');
    localStorage.setItem('userUsername', user.username);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setIsUserAuthenticated(false);
    setUserUsername(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('adminname');
    localStorage.removeItem('isUserAuthenticated');
    localStorage.removeItem('userUsername');
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isUserAuthenticated, username, userUsername, setAdminSession, setUserSession, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

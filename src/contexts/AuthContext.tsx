import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface AuthContextProps {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    // Check for token in local storage
    const storedToken = localStorage.getItem("token");
    // console.log(storedToken);

    if (storedToken) {
      // If token is found, set authenticated to true
      setAuthenticated(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

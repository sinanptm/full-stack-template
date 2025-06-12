export interface AdminAuthState {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  initialize: (token: string | null) => void;
}
type User = {
  name: string;
  id: string;
};
export interface UserAuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;

  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  initialize: (token: string | null, user: User | null) => void;
}

export interface ForgotPasswordState {
  email: string;
  setEmail: (email: string) => void;
  clear: () => void;
}

export interface LoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

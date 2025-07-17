// Token management
export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
};

export const removeToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
};

// User management
export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
};

// Auth state management
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const logout = () => {
  removeToken();
  removeUser();
};

export const saveAuthData = (authData) => {
  setToken(authData.token);
  setUser(authData.user);
}; 
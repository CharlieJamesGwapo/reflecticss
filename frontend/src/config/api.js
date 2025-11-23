// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getApiUrl = () => API_URL;

export const apiEndpoints = {
  // Auth
  auth: {
    register: `${API_URL}/api/auth/register`,
    login: `${API_URL}/api/auth/login`,
    verify: `${API_URL}/api/auth/verify`
  },
  // Users
  users: {
    stats: `${API_URL}/api/users/stats`,
    profile: `${API_URL}/api/users/profile`,
    changePassword: `${API_URL}/api/users/change-password`
  },
  // Notifications
  notifications: {
    list: `${API_URL}/api/notifications`,
    markAsRead: (id) => `${API_URL}/api/notifications/${id}/read`
  },
  // COC
  coc: {
    selection: `${API_URL}/api/coc-selection`,
    coc1: `${API_URL}/api/coc1`,
    coc2: `${API_URL}/api/coc2`,
    coc3: `${API_URL}/api/coc3`
  }
};

export default API_URL;

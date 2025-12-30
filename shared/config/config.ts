export const Routes = {
  login: 'login',
  register: 'register',
  // Add more routes as needed
};

export const BaseUrl = {
  business: 'business/',
  client: 'client/',
  admin: 'admin/',
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3105/api/';
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';


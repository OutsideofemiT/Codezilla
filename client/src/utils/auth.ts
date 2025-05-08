import { jwtDecode } from 'jwt-decode';

interface UserToken {
  name?: string;
  exp: number;
  _id?: string;
  email?: string;
  username?: string;
}

// AuthService class to manage login/logout/token logic
class AuthService {
  // Get user data from token
  getProfile() {
    return jwtDecode(this.getToken() || '');
  }

  // Check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true;
    }
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Login - save token to localStorage
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Logout - remove token
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
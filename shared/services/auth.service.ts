export class AuthService {
  static isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      return parsedPayload.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', token);
  }

  static removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
  }

  static getUserFromToken(): any | null {
    if (typeof window === 'undefined') return null;
    
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch (error) {
      return null;
    }
  }
}


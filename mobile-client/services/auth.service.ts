import AsyncStorage from '@react-native-async-storage/async-storage'

export class AuthService {
  static async isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem('token')
    if (!token) return false

    try {
      const payload = atob(token.split('.')[1])
      const parsedPayload = JSON.parse(payload)
      return parsedPayload.exp > Date.now() / 1000
    } catch (error) {
      return false
    }
  }

  static async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('token')
  }

  static async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem('token', token)
  }

  static async removeToken(): Promise<void> {
    await AsyncStorage.removeItem('token')
  }

  static async getUserFromToken(): Promise<any | null> {
    const token = await this.getToken()
    if (!token) return null

    try {
      const payload = atob(token.split('.')[1])
      return JSON.parse(payload)
    } catch (error) {
      return null
    }
  }
}


import { Alert } from 'react-native'

export class NotificationService {
  static showSuccess(message: string): void {
    Alert.alert('Success', message)
  }

  static showError(message: string): void {
    Alert.alert('Error', message)
  }

  static showWarning(message: string): void {
    Alert.alert('Warning', message)
  }

  static showInfo(message: string): void {
    Alert.alert('Info', message)
  }
}


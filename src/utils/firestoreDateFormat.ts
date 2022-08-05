import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if (timestamp) {
    const date = new Date(timestamp.toDate())

    const day = date.toLocaleDateString('pt-BR')
    console.log(date.toLocaleDateString('pt-BR'))
    const hour = date.toLocaleTimeString('pt-BR')
    console.log(hour)

    return `${day} às ${hour}`
  }
}
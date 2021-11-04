import { StyleSheet } from 'react-native'

export const COLORS = {
  primary: '#1e3d59',
  secondary: '#f5f0e1',
  white: '#fff',
}

export const globals = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  icon: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
})

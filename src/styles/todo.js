import { StyleSheet } from 'react-native'
import { COLORS } from './globals'

export const header = StyleSheet.create({
  container: {
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.primary,
    fontSize: 23,
  },
})

export const list = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
  },
  text: {
    color: COLORS.primary,
    fontSize: 18,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 7,
  },
})

export const footer = StyleSheet.create({
  container: {
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: COLORS.primary,
    borderWidth: 0.5,
    marginRight: 5,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  icon: {
    borderRadius: 30,
    padding: 12,
    marginLeft: 5,
    backgroundColor: '#ccc',
  },
})

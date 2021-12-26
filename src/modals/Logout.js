import React, { useContext } from 'react'
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'
import Context from '../context/exports'

const Logout = ({ modalOpen, setModalOpen }) => {
  const { logout } = useContext(Context.Auth.Context)
  return (
    <Modal animationType={'fade'} transparent={true} visible={modalOpen}>
      <View style={Styles.Modal}>
        <View style={Styles.Container}>
          <Text style={Styles.Header}>
            Are you sure you want to {'\n'}logout?
          </Text>
          <View style={Styles.ButtonGrid}>
            <Pressable
              onPress={logout}
              style={[Styles.ButtonContainer, { backgroundColor: '#F44336' }]}
            >
              <Text style={Styles.ButtonText}>Logout</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalOpen(false)}
              style={Styles.ButtonContainer}
            >
              <Text style={[Styles.ButtonText, { color: '#607D8B' }]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const Styles = StyleSheet.create({
  Modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Container: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 12,
    borderRadius: 12,
  },
  Header: {
    textAlign: 'center',
    fontSize: 23,
    color: '#37474F',
    marginBottom: 12,
    lineHeight: 32,
  },
  ButtonGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ButtonContainer: {
    padding: 10,
    borderRadius: 19,
    marginTop: 9,
    width: '70%',
  },
  ButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
})

export default Logout

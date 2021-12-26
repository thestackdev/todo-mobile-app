const isUsername = (username) => {
  if (username.length < 6) return 'Must be 6 characters'
  const isValid = /^[a-z_\-]+$/.test(username)
  if (!isValid) return 'Only lowercase are allowed'
  return 'valid'
}

const isEmail = (email) => {
  const isValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    )
  if (!isValid) return 'Email malformated'
  return 'valid'
}

const isPassword = (password) => {
  if (password.length < 6) return 'Must be 6 characters'
  const isValid =
    /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(password)
  if (!isValid) return 'Please choose a strong password'
  return 'valid'
}

export { isUsername, isEmail, isPassword }

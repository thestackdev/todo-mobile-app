const isUsername = (username) => {
  const isValid = /^[a-z_\-]+$/.test(username)
  return isValid
}

const isEmail = (email) => {
  const isValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    )
  return isValid
}

const isPassword = (password) => {
  const isValid =
    /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(password)
  return isValid
}

export { isUsername, isEmail, isPassword }

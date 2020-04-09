import JwtDecode from 'jwt-decode'

export default function decodeToken(token) {
  
  let decoded = {}
  let invalidToken = false

  try {
    decoded = JwtDecode(token)
  } catch (err) {
      if(err) {
        invalidToken = true
        localStorage.removeItem('x-auth-token')
      } 
  }
  return { decoded, invalidToken }
}
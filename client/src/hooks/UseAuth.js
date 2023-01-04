import { useSelector } from 'react-redux'

export const useAuth = () => {
  const {isAuth, email, token} = useSelector(state => state.user)
  return {
    isAuth,
    email,
    token
  }
}
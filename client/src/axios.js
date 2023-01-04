import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const instance = axios.create({
	baseURL: process.env.BACKEND_URL
})

const authInstance = axios.create({
	baseURL: process.env.BACKEND_URL
})

const authInterceptor = config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
}

authInstance.interceptors.request.use(authInterceptor)

export {instance, authInstance}
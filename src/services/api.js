import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true  // Enable session cookies
})

// Add response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    // Pass the error up to the component to handle
    // Don't redirect here to avoid infinite loops
    if (error.response?.status === 401) {
      // Store redirect flag but don't redirect immediately
      sessionStorage.setItem('redirect_to_login', 'true')
    }
    return Promise.reject(error)
  }
)

// Authentication functions
export async function login(username, password) {
  return api.post('/login', { username, password })
}

export async function logout() {
  return api.post('/logout')
}

export async function getCurrentUser() {
  try {
    return await api.get('/me')
  } catch (err) {
    if (err.response?.status === 401) {
      return null
    }
    throw err
  }
}

// Transaction analysis
export async function predict(payload) {
  return api.post('/predict', payload)
}

// Dashboard & Statistics
export async function getDashboard() {
  return api.get('/dashboard')
}

// Transaction history
export async function getTransactions(page = 1, limit = 50, search = '', filter = 'All') {
  return api.get('/transactions', {
    params: { page, limit, search, filter }
  })
}

// Get specific transaction details with SHAP values
export async function getTransactionDetail(transactionId) {
  return api.get(`/transactions/${transactionId}`)
}

// Real-time alerts
export async function getAlerts() {
  return api.get('/alerts')
}

// Model information
export async function getModelInfo() {
  return api.get('/model-info')
}

export default api

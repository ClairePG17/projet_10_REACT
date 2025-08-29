const BASE_URL = 'http://localhost:3001/api/v1/user'

export const userAPI = {
  signIn: async (credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    if (!response.ok) {
      throw data // ou throw new Error(data.message) selon API
    }
    return data
  }
}

const BASE_URL = 'http://localhost:3001/api/v1/user'

export const userAPI = {
  signIn: async (credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    if (!response.ok) throw data
    return data
  },

  getProfile: async (token) => {
    const response = await fetch(`${BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const data = await response.json()
    if (!response.ok) throw data
    return data
  },

  updateUserProfile: async (profileData, token) => {
    const response = await fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
    const data = await response.json()
    if (!response.ok) throw data
    return data
  },
}

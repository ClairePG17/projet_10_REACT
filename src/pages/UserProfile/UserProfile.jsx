import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../../redux/reducers/authSlice'
import CartTransaction from '../../components/CartTransaction/CartTransaction'

export default function UserProfile() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.auth.profile)
  const loading = useSelector(state => state.auth.loading)

  const [isEditing, setIsEditing] = useState(false)

  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, profile])

  useEffect(() => {
    if (profile) {
      setUserName(profile.userName ?? '')
      setFirstName(profile.firstName ?? '')
      setLastName(profile.lastName ?? '')
    }
  }, [profile])

  if (loading === 'pending') return <div>Chargement du profil...</div>
  if (!profile) return <div>Erreur : profil utilisateur non trouvé.</div>

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateUserProfile({ userName, firstName, lastName }))
    setIsEditing(false)
  }

  return (
    <main className="main bg-dark">
    {isEditing && (
      <div className="edit-user-form">
        <h2 className="title">Edit user info</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>User name:</label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label>First name:</label>
            <input
              type="text"
              value={firstName}
              readOnly
              disabled
            />
          </div>
          <div>
            <label>Last name:</label>
            <input
              type="text"
              value={lastName}
              readOnly
              disabled
            />
          </div>
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      </div>
    )}
  
    {!isEditing && (
      <div className="header">
        <h1 className="title">
          Welcome back<br />
          {firstName} {lastName} !
        </h1>
        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
      </div>
    )}
  
    <h2 className="sr-only">Accounts</h2>
    <CartTransaction
      title="Argent Bank Checking"
      number="8349"
      amount="2,082.79"
      description="Available Balance"
    />
    <CartTransaction
      title="Argent Bank Savings"
      number="6712"
      amount="10,928.42"
      description="Available Balance"
    />
    <CartTransaction
      title="Argent Bank Credit Card"
      number="8349"
      amount="184.30"
      description="Current Balance"
    />
  </main>
  
  )
}

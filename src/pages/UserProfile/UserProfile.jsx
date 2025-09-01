import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../../redux/reducers/authSlice'
import CartTransaction from '../../components/CartTransaction/CartTransaction'

export default function UserProfile() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.auth.profile)
  const loading = useSelector(state => state.auth.loading)

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  if (loading === 'pending') {
    return <div>Chargement du profil...</div>
  }

  if (!profile) {
    return <div>Erreur : profil utilisateur non trouvé.</div>
  }

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {profile.firstName} {profile.lastName} !
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
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
    </>
  )
}
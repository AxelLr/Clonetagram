import React from 'react'
// COMPONENTS
import UserData from './components/UserData'
// REDUX
import { useSelector } from 'react-redux'

export default function UserSection() {

    const connectedUser = useSelector(state => state.user.loggedUser)
    const loading = useSelector(state => state.user.loading)

    return (
        <section className='users-section'>
            < UserData connectedUser={connectedUser} loading={loading} />
        </section>
    )
}

import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {

const authenticated = useSelector(state => state.user.authenticated)
console.log(authenticated)

    return (
        <div>
            HOME 
        </div>
    )
}

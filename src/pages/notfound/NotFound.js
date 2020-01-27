import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='notFound-container'>
            <div className='notFound-text-container'>
                <h1> E404</h1>
                <h2>Lo sentimos. la página que buscas no existe.</h2>
                <h2> Volver al <Link to='/Home' style={{textDecoration: 'none'}}> <span> Inicio </span> </Link></h2> 
            </div>
            
        </div>
    )
}

import React from 'react'
import Card from '@material-ui/core/Card'

export default function PrivateAccountSign() {
    return (
        <div style={{width: '100%', height: 200, display: 'flex'}}> 
            <Card elevation='10' style={{ margin: 'auto', fontFamily: 'Open Sans', padding: 20 }}>
            Esta cuenta es privada. Siguela para ver su contenido.
            </Card>
        </div>
    )
}

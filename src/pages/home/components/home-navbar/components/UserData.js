import React from 'react'
// MUI
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
// UTIL
import noProfileImg from '../../../../../util/images/noprofileimg2.png'

export default function UserData({ loading, connectedUser, history}) {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            { loading ?
              <div> 
                <img 
                  alt='no-profile' 
                  src={noProfileImg} 
                  style={{borderRadius: '50%', margin: 10, width: 50, height: 50}}
                />
              </div>  
            : 
              <div> 
                  <img 
                    onClick={() => history.push(`/users/${connectedUser._id}`)} 
                    alt='profile' 
                    src={connectedUser.profileImg} 
                    style={{borderRadius: '50%', margin: 10, height: 50, width: 50, cursor: 'pointer'}}
                  />
              </div>          
            }
              <Typography variant='h6' style={{margin: 15}}>
                { loading ? 
                    < Skeleton width={150} animation="wave" /> : 
                    <div style={{cursor:'pointer'}} onClick={() => history.push(`/users/${connectedUser._id}`)} > 
                        {connectedUser.username}
                    </div>
                }
              </Typography>
          </div>
    )
}

import React from 'react'
// MUI
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
// UTIL
import noProfileImg from '../../../../../util/images/noprofileimg2.png'
// COMPONENTS
import Avatar from '../../../../../components/Avatar'
// ROUTER
import { useHistory } from 'react-router-dom'

export default function UserData({ loading, connectedUser }) {

  const history = useHistory()

    return (
        <div className='user-data'>
            { loading ?
              <div> 
                <Avatar 
                  alt='no-profile' 
                  src={noProfileImg} 
                  width={50}
                  height={50}
                />
              </div>  
            : 
              <div> 
                  <Avatar 
                    onClick={() => history.push(`/users/${connectedUser._id}`)} 
                    alt='profile' 
                    src={connectedUser.profileImg}
                    width={50}
                    height={50}
                    pointer
                  />
              </div>          
            }
              <Typography variant='h6' >
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

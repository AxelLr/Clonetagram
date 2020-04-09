import React,{ useState, useEffect } from 'react'
import axios from 'axios'
// MUI
import { fade, makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
// ICONS
import SearchIcon from '@material-ui/icons/Search'
// COMPONENTS
import UserList from './UserList'
// CUSTOM HOOKS
import { useDidUpdateEffect } from '../../../../../customHooks/useDidUpdateEffect'

const useStyles = makeStyles(theme => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  }))

export default function SearchByUsername() {

   const classes = useStyles()

   const [open, setOpen] = useState(false)
   const [filter, setFilter] = useState('')
   const [usersList, setUsersList] = useState([])
   const [searchResults, setSearchResults] = useState([])
   const [typingTimeout, setTypingTimeOut ] = useState(0)
  
   useEffect(() => {
    const results = usersList.filter(user =>
    user.username.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    setSearchResults(results)
  }, [usersList])

  const getAllUsers = async () => {
    const response = await axios.get(`/users/?search=${filter}`)
    setUsersList(response.data)
  } 

  const handleFilter = e => setFilter(e.target.value)
  
  useDidUpdateEffect(() => {
    if(open) { 
      typingTimeout && clearTimeout(typingTimeout)
    setTypingTimeOut(setTimeout(() => getAllUsers(filter), 1000))
   }
  },[open, filter])

    return (
        <div>
            <div className={classes.search} >
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase         
                defaultValue=''  
                onChange={handleFilter}
                value={filter}
                onFocus={() =>setOpen(true)}
                onBlur={() => {  
                    setOpen(false)
                    setFilter('')
                }}
                placeholder="Buscar..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
              <UserList open={open} setOpen={setOpen} searchResults={searchResults} />
            </div>        
        </div>
    )
}

import React,{ useState, useEffect } from 'react'
import UserList from './userlist/UserList'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../redux/actions/DataActions'
// MUI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import PublicIcon from '@material-ui/icons/Public'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 80
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
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
}));

export default function SearchAppBar(props) {

 const usersList = useSelector(state => state.data.usersList)

 const [open, setOpen] = useState(false)
 const [filter, setFilter] = useState('')
 const [searchResults, setSearchResults] = useState([])
 const [typingTimeout, setTypingTimeOut ] = useState(0)

 const dispatch = useDispatch()

 const classes = useStyles()

 const { handlePosts, setHandlePosts } = props

 useEffect(() => {
  const results = usersList.filter(user =>
    user.username.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) 
  );
  setSearchResults(results);
}, [filter, usersList]);

 const handleFilter = (e) => {

  if(typingTimeout) clearTimeout(typingTimeout)
 
  setFilter(e.target.value)
  setOpen(true)
  setTypingTimeOut(setTimeout( () => dispatch(getAllUsers(filter)), 1000))

 }
 
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#121212'}}>
        <Toolbar>
        <div className='posts-navbar-container'> 
            <div>  
              <Button onClick={() => setHandlePosts(true) } variant="contained" style={{backgroundColor: handlePosts ? '#e5e5e5' : '#121212'}}>
                < HomeIcon style={{color: '#888888'}} />
              </Button>
              
              <Button onClick={() => setHandlePosts(false) } variant="contained" style={{backgroundColor: handlePosts ? '#121212' : '#e5e5e5'}} >
               < PublicIcon style={{color: '#888888'}} />
              </Button>
            </div>
          
            <div className={classes.search} >
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase             
                onChange={handleFilter}
                value={filter}
                onFocus={handleFilter}
                onBlur={() => setOpen(false)}
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

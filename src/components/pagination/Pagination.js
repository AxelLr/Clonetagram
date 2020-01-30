import React,{ useState, useEffect } from 'react'
// REDUX
import { getPostsFromPage } from '../../redux/actions/DataActions'
import { useDispatch, useSelector } from 'react-redux'

export default function Pagination() {

    const dispatch = useDispatch()

    const numberOfPosts = useSelector(state => state.data.numberOfPosts)
    const [ numberOfPages, setNumberOfPages ] = useState(1)
    const [ currentPage, setCurrentPage ] = useState('page-1')

    let postsPerPage = 8;
    let pagination = []

    for(let i = 1; i <= numberOfPages; i++) {
        pagination.push(i)
    } 

    useEffect(() => {
    setNumberOfPages( Math.ceil(numberOfPosts / postsPerPage)) 
    }, [numberOfPosts, postsPerPage])

    const handlePagination = (page) => {

       dispatch(getPostsFromPage(page))
       setCurrentPage(`page-${page}`)

       let selectedPage = document.getElementById(`page-${page}`)
       selectedPage.classList.add('selected-page')
    }
    

    return (
        <div className='pagination-container'>

            { pagination.map( (page, key) => 
            
            <span className={ currentPage === `page-${page}` ? 'selected-page' : null } id={`page-${page}`} onClick={() => handlePagination(page)} key={key}> {page} </span>
            
            )}
            
        </div>
    )
}

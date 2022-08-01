import react from 'react';
import {useSelector} from 'react-redux'
import {useEffect , useState} from 'react'
import Post from './post/Post';
import {Grid , CircularProgress} from '@mui/material'
import {fetchPost} from '../../api/index'
const Posts = ({setCurrentId })=>{
  
    const posts = useSelector(state=>state.posts.posts)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const currentUserId = user?.user?._id
    
    
    

    

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid  container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12}   >
                  <Post post={post} setCurrentId={setCurrentId} user={user}   currentUserId = {currentUserId} />
                </Grid>
              ))}
            </Grid>
          )
    )
}
export default Posts

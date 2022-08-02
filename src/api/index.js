import axios from 'axios';
const url = 'https://meow-book-server.herokuapp.com'


const API = axios.create({ baseURL: 'https://meow-book-server.herokuapp.com' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).tokenId}`
    }
    return req;

})

export const fetchPost = () => {

    // return axios.get(`${url}/posts`) 
    return API.get('/posts')
}
export const createPost = (newPost) => {
    // return axios.post(`${url}/posts` ,newPost)
  
    return API.post(`/posts`, newPost  )
}

export const editPost = (_id, post) => {
    // return axios.patch(`${url}/posts/${_id}` ,post)
    return API.patch(`/posts/${_id}`, post)
}
export const deletePost = (_id) => {
    if (_id) {

        return API.delete(`/posts/${_id}`)

    }
}
export const likePost = (_id) => {

    // return axios.patch(`${url}/posts/${_id}/likePost`)
    return API.patch(`/posts/${_id}/likePost`)
}

// auth 
export const signIn = (formData) => {
    // return axios.post(`${url}/users/signIn`,formData)
    return API.post(`/users/signIn`, formData)
}
export const signUp = (formData) => {
    // return axios.post(`${url}/users/signUp`,formData)
    return API.post(`/users/signUp`, formData)
}

//  call method POST /profile/changeAvartar/:id    id is id of user in mongob server 
export const updateAvatar = (id , data) =>{
    return API.post(`profile/changeAvartar/:${id}`,data)
}
// GET method to get userData from database
export const getUserData = (_id)=>{
    return API.get(`profile/getUserData/${_id}`)
}
// method to add comment     POST :     /posts/:_id/
export const addComment = (_id , commentData)=>{
    return API.post(`/posts/${_id}/addComment`,commentData)
}
// mehtod patch edit comment  /posts//:_id/:commentId
export const editComment = (_id ,commentId ,  commentData)=>{

    return API.patch(`/posts/${_id}/${commentId}`,commentData)
}
// method delete/posts/${_id}/:commentid
export const deleteComment = (_id ,commentId) =>{

    return API.delete(`/posts/${_id}/${commentId}`)
}
// method patch  /profile/follow/:_currentUserId/:_followUserId

export const followUser = ( followUserId) =>{

    return API.patch(`/profile/follow/${followUserId}`)
}


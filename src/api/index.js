import axios from 'axios';
const url = 'https://meo-book-server.herokuapp.com'


const API = axios.create({ baseURL: 'https://meo-book-server.herokuapp.com' })

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
    console.log(data);
    return API.post(`profile/changeAvartar/${id}`,data)
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
// Message method get api 


// get /chat/conversation/:_id 
// post /chat/conversation/:_id
// delete /chat/conversation/:conversationId

// get /chat/message/:conversationId	
// post /chat/message/:conversationId	
// delete /chat/message/:_id (_id is message id)


// get all conversation of _id person 
export const getConversation = (_id) =>{

    return API.get(`/chat/conversation/${_id}`)
}

// userId is {senderId : ? , receiverId : ?}  
//senderId is current user auth
//receiverId is _id of person 


export const createNewConversation  = (_id,userId) =>{


    return API.post(`/chat/conversation/${_id}`,userId)
}
// _id 
export const deleteConversation  = (conversationId) =>{

    return API.delete(`chat/conversation/:${conversationId}`)
}
export const getMessage  = (conversationId) =>{

    return API.get(`/chat/message/${conversationId}`)
}
export const createMessage = (conversationId , messageData) =>{
  

    return API.post(`/chat/message/${conversationId}` , messageData)
}
export const deleteMessage  = (messageId) =>{

    return API.delete(`/chat/message/${messageId}`)
}
// GET Method to filter users in list by name 
// get /profile/filter/:searchText
export const filterUser = (searchText) =>{
    return API.get(`/profile/filter/${searchText}`)
}



import * as api from '../api'

import { createAsyncThunk } from "@reduxjs/toolkit";






export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const { data } = await api.fetchPost();

    return data;
})




// }
export const createPost = createAsyncThunk('posts/createPost', async (post) => {
   




    const { data } = await api.createPost(post)

    return data;


})



export const editPost = createAsyncThunk('posts/editPost', async (result) => {


    const { data } = await api.editPost(result.currentId, result.postData)

    return data;



})
export const likePost = createAsyncThunk('posts/likePost', async (_id) => {
   
    const { data } = await api.likePost(_id)
    
    return data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async (_id) => {

    await api.deletePost(_id);
    return _id;


})
export const addComment = createAsyncThunk('posts/addComment', async ({ _id, commentData }) => {
    const { data } = await api.addComment(_id,commentData)
  
   
    
    
   
    return {...data , _id : _id}


})
export const editComment = createAsyncThunk('posts/editComment' , async ({_id , commentId , commentData})=>{
   
    const { data } = await api.editComment(_id,commentId,commentData)
    


    return {...data , _id : _id  }

})
export const deleteComment = createAsyncThunk('posts/deleteComment', async ({ _id , commentId }) => {
    await api.deleteComment(_id,commentId)
    return {_id : _id, commentId : commentId}
})

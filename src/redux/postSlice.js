import { createSlice } from "@reduxjs/toolkit"
import * as action from "../actions/posts"
export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        status: 'idle',
        posts: []
    },
    reducers: {
        //     getPosts : (state , action )=>{

        //         state.posts = action.payload



        //     },
        //     createPost : (state , action )=>{
        //         state.posts.push(action.payload)
        //     },
        //     editPost : (state ,action) => {
        //         let currentPost = state.posts.find((post)=>{

        //             return post.id === action.payload._id

        //         }) 
        //         if(currentPost){

        //             currentPost = action.payload.data
        //         }

        //     },
        // deletePost :(state , action) =>{
        //     state.posts.filter((post)=>{
        //         return post._id !== action.payload
        //     })

        // }


    },




    extraReducers: (builder) => {
        builder
            .addCase(action.getPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(action.getPosts.fulfilled, (state, action) => {
                state.status = 'success'
             
                state.posts = action.payload;
            })
            .addCase(action.createPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(action.createPost.fulfilled, (state, action) => {
                state.status = 'success'
                state.posts.push(action.payload);
            })
            .addCase(action.editPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(action.editPost.fulfilled, (state, action) => {
               
                state.status = 'success'
                state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));

            })
            .addCase(action.editPost.rejected, (state, action) => {
                state.status = 'Error';
            })
            .addCase(action.deletePost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(action.deletePost.fulfilled, (state, action) => {
                state.status = 'success'
                state.posts = state.posts.filter((post) => {
                    return post._id !== action.payload
                })
            })
            .addCase(action.likePost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(action.likePost.fulfilled, (state, action) => {
                state.status = 'success'
                state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
            })
            .addCase(action.addComment.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(action.addComment.fulfilled, (state, action) => {
                state.status = 'success'
                let currentPost = state.posts.find(post => post._id === action.payload._id)
                currentPost.comments.push({
                    avatarUrl: action.payload.avatarUrl,
                    name: action.payload.name,
                    content: action.payload.content,
                    userId: action.payload.userId,
                    commentId: action.payload.commentId
                })


            })
            .addCase(action.editComment.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(action.editComment.fulfilled, (state, action) => {
                state.status = 'success'
                const currentPost = state.posts.find(post => post._id === action.payload._id)

                for (let i = 0; i < currentPost.comments.length; i++) {
                    if (currentPost.comments[i].commentId === action.payload.commentId) {
                        currentPost.comments[i].content = action.payload.content
                        currentPost.comments[i].avatarUrl = action.payload.avatarUrl
                    }
                }
                state.posts = state.posts.map((post) => (post._id === action.payload._id ? currentPost : post));



            })
            .addCase(action.deleteComment.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(action.deleteComment.fulfilled, (state, action) => {
                state.status = 'success'
                let currentPost = state.posts.find(post => post._id === action.payload._id)
                const newComments = currentPost.comments.filter(comment => comment.commentId !== action.payload.commentId)
                let newPost = {
                    ...currentPost,
                    comments: newComments
                }
                state.posts = state.posts.map((post) => (post._id === action.payload._id ? newPost : post));



            })



    }



})

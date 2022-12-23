import {IconButton, ImageListItem, ImageListItemBar} from '@mui/material';
import React, {useContext, useState} from 'react'
import {FaRegComment} from 'react-icons/fa';
import {UserContext} from '../../App';
import ModalDetailPost from '../../ModalDetailPost/ModalDetailPost';

const CurrentUserImageItem = ({item, cols, rows}) => {
    const user = useContext(UserContext).user
    const [openDetailPost, setOpenDetailPost] = useState(false);
    const find = item?.likes.find(id => id === user?.user?._id)


    const [likeAction, setLikeAction] = useState(find)

    return (
        <ImageListItem
            sx={{
                "&:hover": {
                    opacity: '0.7'
                }
            }}
            key={item._id}
            cols={cols}
            rows={rows}
        >
            <img
                src={item.selectedFile}
                alt={item.title}
                loading="lazy"
            />
            <ImageListItemBar
                sx={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                actionIcon={
                    <IconButton
                        sx={{color: 'white'}}
                        aria-label={`star ${item.title}`}
                        onClick={() => {
                            setOpenDetailPost(true)
                        }}
                    >
                        <FaRegComment/>

                    </IconButton>
                }
                actionPosition="left"
            />

            {/* modal detail post */}
            <ModalDetailPost key={item._id} likeAction={likeAction} setLikeAction={setLikeAction}
                             openDetailPost={openDetailPost} setOpenDetailPost={setOpenDetailPost} post={item}
                             user={user}/>
        </ImageListItem>
    )
}

export default CurrentUserImageItem
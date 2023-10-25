import React from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

const Likes = ({ post, user }) => {
    const likesCount = post.likes.length;

    if (likesCount > 0) {
        return post.likes.find((like) => like === (user?.data?._id))
            ? (
                <>
                    <ThumbUpAltIcon
                        fontSize='small'
                    />
                    &nbsp;{
                        likesCount > 2
                            ? `You and ${likesCount - 1} others`
                            : `${likesCount} like${likesCount > 1
                                ? 's'
                                : ''}`
                    }
                </>
            )
            : (
                <>
                    <ThumbUpAltOutlined
                        fontSize='small'
                    />
                    &nbsp;{likesCount} {
                        likesCount === 1
                            ? 'Like'
                            : 'Likes'
                    }
                </>
            )
    }
    return <>
        <ThumbUpAltOutlined
            fontSize='small'
        />
        &nbsp;Like
    </>
}

export default Likes

import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import noImagePost from '../../assets/images/no-image-post.png';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../actions/posts';
import Likes from '../Likes/Likes';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={post.selectedFile || noImagePost}
                title={post.title}
            />

            <div className={classes.overlay}>
                <Typography variant='h6'>
                    {post.name}
                </Typography>

                <Typography variant='body2'>
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>

            {user?.data?._id === post?.creator
                && (
                    <div className={classes.overlay2}>
                        <Button
                            style={{ color: 'white' }}
                            size='small'
                            onClick={() => setCurrentId(post._id)}
                        >
                            <MoreHorizIcon fontSize='medium' />
                        </Button>
                    </div>
                )}

            <div className={classes.details}>
                <Typography
                    variant='body2'
                    color='textSecondary'
                >
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>

            <Typography
                variant='h5'
                className={classes.title}
                gutterBottom
            >
                {post.title}
            </Typography>

            <CardContent>
                <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                >
                    {post.message}
                </Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button
                    size='small'
                    color='primary'
                    disabled={!user?.data}
                    onClick={() => dispatch(likePost(post._id))}
                >
                    <Likes
                        post={post}
                        user={user}
                    />
                </Button>

                {user?.data?._id === post?.creator
                    && (
                        <Button
                            size='small'
                            color='primary'
                            onClick={() => {
                                dispatch(deletePost(post._id));
                                setCurrentId(null)
                            }}
                        >
                            <DeleteIcon fontSize='small' />
                            &nbsp;
                            Delete
                        </Button>
                    )}
            </CardActions>
        </Card>
    )
}

export default Post

import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const post = useSelector((state) => currentId
        ? state.posts.find((item) => item._id === currentId)
        : null);

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData({ ...post, tags: post.tags.join(' ') })
    }, [post]);

    const resetForm = () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const tagsArr = postData.tags.split(' ');

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, tags: tagsArr }));
        } else {
            dispatch(createPost({ ...postData, tags: tagsArr }));
        }
        resetForm();
    }

    return (
        <Paper className={classes.paper}>
            <form
                autoComplete='off'
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant='h6'>
                    {currentId ? 'Editing' : 'Creating'}
                    {' '}
                    a Memory
                </Typography>

                <TextField
                    name='creator'
                    variant='outlined'
                    label='Creator'
                    fullWidth
                    value={postData.creator}
                    onChange={(event) => setPostData({ ...postData, creator: event.target.value })}
                />

                <TextField
                    name='title'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                />

                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    value={postData.message}
                    onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                />

                <TextField
                    name='tags'
                    variant='outlined'
                    label='Tags'
                    fullWidth
                    value={postData.tags}
                    placeholder='Separate tags with spaces'
                    onChange={(event) => setPostData({ ...postData, tags: event.target.value })}
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiply={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>

                <Button
                    className={classes.buttonSubmit}
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                    fullWidth
                >
                    Submit
                </Button>

                <Button
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={resetForm}
                    fullWidth
                >
                    clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form

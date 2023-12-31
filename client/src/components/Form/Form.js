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
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    })

    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();

    useEffect(() => {
        setPostData(
            post
                ? { ...post, tags: post.tags.join(' ') }
                : {
                    title: '',
                    message: '',
                    tags: '',
                    selectedFile: '',
                }
        )
    }, [post]);

    const resetForm = () => {
        setCurrentId(null);
        setPostData({
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
            dispatch(updatePost(currentId, { ...postData, name: user?.data?.name, tags: tagsArr }));
        } else {
            dispatch(createPost({ ...postData, name: user?.data?.name, creator: user?.data?._id, tags: tagsArr }));
        }
        resetForm();
    }

    if (!user?.data?.name) {
        return (
            <Paper
                className={classes.paper}
            >
                <Typography
                    variant='h6'
                    align='center'
                >
                    Please Sign In to create your memories
                </Typography>
            </Paper>
        )
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
                    name='title'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    required
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                />

                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    value={postData.message}
                    required
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
                        required
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

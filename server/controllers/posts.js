import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import { responseData } from "../constants/requestsData.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res
            .status(200)
            .json(postMessages);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, cretedAt: new Date().toISOString() });

    console.log(req.userId)

    try {
        await newPost.save();
        res
            .status(201)
            .json(newPost);
    } catch (error) {
        res
            .status(409)
            .json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .send(responseData.postNotFound(id));
    }

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    try {
        await PostMessage.findByIdAndUpdate(
            id, updatedPost, { new: true }
        );

        res
            .status(200)
            .json(updatedPost);
    } catch (error) {
        res
            .status(409)
            .json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: 'Unauthentificated' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .send(responseData.postNotFound(id));
    }

    try {
        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === - 1) {
            // like
            post.likes.push(req.userId);
        } else {
            // dislike
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(
            id, post, { new: true }
        );

        res
            .status(200)
            .json(updatedPost);

            console.log({message: `user ${req.userId} liked post ${id}`})
    } catch (error) {
        res
            .status(409)
            .json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .send(responseData.postNotFound(id));
    }

    try {
        await PostMessage.findByIdAndRemove(id);

        res
            .status(200)
            .json({ message: responseData.deletePost });
    } catch (error) {
        res
            .status(409)
            .json({ message: error.message });
    }
}

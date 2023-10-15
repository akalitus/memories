import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    creator: { type: String, required: true },
    tags: { type: [String] },
    selectedFile: { type: String, required: true },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const PostMessage = mongoose.model('PostMessage', PostSchema);

export default PostMessage;
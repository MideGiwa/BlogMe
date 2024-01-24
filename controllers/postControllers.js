const Post = require("../models/post");

const createNewPost = async (req, res) => {
    try {
        const { title, content, userName, firstName, lastName } = req.body;


        if (!title || !content) return res.status(400).send("Missing fields!");
        const name = firstName + lastName;
        const author = userName || `${firstName} ${lastName}`;
        const post = await Post.create({
            title,
            author,
            content
        });

        return res.status(201).json(post);
        console.log(post);

    } catch (err) {
        return console.log(err);
    }
    return null;
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});

        return res.status(201).json(posts);
        console.log(posts);
    } catch (err) {
        return console.log(err);
    }

    //     return null;
};

const getSinglePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (!postId) return res.status(400).send("Missing post Id.");
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        return res.status(200).json(post);
        console.log(post);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const { content } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        return res.status(200).json(updatedPost);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        return res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    createNewPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost,
};
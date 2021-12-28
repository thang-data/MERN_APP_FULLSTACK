const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post');
/////////////////////////////////////////////
router.post('/', verifyToken ,async (req, res) => {    
    try {
        const posts = await Post.find({ user: req.userId }).populate('user',['username'])
        res.json({success: true, posts})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    } 
})

//////////////////////////////////////////////

router.post('/', verifyToken ,async (req, res) => {
    const { title, description, url, status } = req.body
    
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: ' Title is requie!' });
    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: '61bc0eaf2a60b89bb4be8f8d'
        })
        await newPost.save();
        
        res.json({success: true, message: 'Happy learning!', post: newPost})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
  
})
////////////////////////////////
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: ' Title is requied!' });
    try {
        let updatedPost = {
            title,
            description: description || '',
            url: ((url.startsWith('https://')) ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true })
        
        // User not authorize to update post or post not found

        if (!updatedPost)
            return res
                .status(401)
                .json({
                    success: false, message: ' Post not found or user not authorized'
                })
        res.json({success: true, message: 'Excellent progress!!', post: updatedPost})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})
////////////////////////////////
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        //user not authorize  or post not found 

        if (!deletePost)
            return res
                .status(401)
                .json({
                    success: false, message: ' Post not found or user not authorized'
                })
        res.json({success: true, post: deletePost})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})
///////////////////////////////
module.exports = router
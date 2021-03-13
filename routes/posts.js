const express = require('express');
const Post = require('../models/Post')
const router = express.Router();

//Returns an specific post
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
})

//Returns all the posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts)
    } catch (err){
        res.status(400).json({message: err});
    }
});

router.get('/specific', (req, res) => {
    res.send('We are on posts specific');
});

//Deletes a post
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }
    catch (err) {
        res.status(400).json({message: err});
    }
})


//Submits a post;
router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    
    post.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.json({message: err})
    })
});

//Updates a post
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        );
        res.status(200).json(updatedPost);
    } catch(err){
        res.status(400).json({message: err});
    }
})
/*
//Outro jeito de fazer a mesma coisa
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    
    try{
    const savedPost = await post.save()
    res.json(savedPost);
    }
    catch (err) {
        res.send({message: err})
    }
});*/

module.exports = router;
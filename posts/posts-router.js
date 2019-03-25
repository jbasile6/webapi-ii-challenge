const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(req.body)
            .then( post => {
                Posts.findById(post.id)
                .then(newPost => {
                    res.status(201).json(newPost);
                })
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})


router.get('/', (req, res) => {
    Posts.find()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Posts.findById(id)
        .then( post => {
            if (!post.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Posts.remove(id)
        .then(post => {
            if(!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch( err => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})


router.put('/:id', (req, res) => {
    const id = req.params.id;
    if (req.body.title && req.body.contents) {
        Posts.update(id, req.body)
            .then(count => {
                if (count > 0) {
                    Posts.findById(id) 
                        .then(post => {
                            res.status(200).json(post)
                        })
                    
                } else {
                    res.status(404).json({ errorMessage: "Please provide title and contents for the post." })
                }
            })
            .catch( err => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }
})


module.exports = router;
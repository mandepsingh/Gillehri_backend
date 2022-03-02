
import mongoose from 'mongoose'
import express from 'express';

import PostMessage from '../models/postMessage.js'

const router = express.Router();

export const getPosts = async (req,res) => {
    // console.log(res);
     try {
         const postMessages = await PostMessage.find()
         .then(calendar => {
            res.json(calendar)
        })
        .catch(err => {
            res.status(500).send({ message: "Error occurred while retriving user information" })
        })
         //  res.send('this works!')
        //  res.status(200).json(postMessages);
        //  res.send(json(postMessages));
     } catch (error) {
         res.status(404).json({ message : error.message});
     }
    
}

export const createPost= async (req,res) => {
    const post = req.body;
    console.log("india");
    console.log(post);
    // alert(post);
    
    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        console.log('create posterrrrrrr');
        res.status(201).json(newPost);

    } catch (error) {
        // console.log('i am here')
        res.status(409).json({ message : error.message});
    }
}

export const deletePost= async (req,res) => {
    const id = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);
    res.json({ message : 'Post deleted successfully.'})
}
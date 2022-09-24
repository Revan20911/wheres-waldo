const ObjectId = require("mongodb").ObjectId;
const express = require("express");
const imgRoute = express.Router();
const Image = require("../models/ImageModel");

imgRoute.get('/images', async (req, res) => {
   const response = await Image.find({});
   res.json(response); 
});

imgRoute.put('/update/:id', async (req, res) => {
   let newImg = new Image({
    _id: ObjectId(req.params.id),
    name: req.body.name,
    xPos: req.body.xPos,
    yPos: req.body.yPos,
    found: req.body.found,
   });

   const update = await Image.findOneAndUpdate({_id: req.params.id}, newImg, {new: true});
   res.send(`Found ${req.body.name}`);
   update.save();

})

module.exports = imgRoute;



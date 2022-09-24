const express = require("express");
const mongoose = require("mongoose");


const ImageModel = new mongoose.Schema({
    name: String,
    xPos: String,
    yPos: String,
    found: String,
});

const Image = mongoose.model('Image', ImageModel, "characters");

module.exports = Image;
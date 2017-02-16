/*jshint esversion:6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = Schema({
  username: String,
  email: String,
  password: String,
  namePicture: String,
  pic_path: String,
  pic_name: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;

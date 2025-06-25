const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({

 image: {
     type: String
  },
  public_id: {
    type: String
  }
}, {timestamps: true});

const GalleryModel = mongoose.model('Gallery', GallerySchema);

module.exports = GalleryModel;
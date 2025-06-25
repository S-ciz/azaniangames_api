const express = require('express')
const multer = require('multer')
const cloudinary = require('../cloudinary')
const GalleryRouter = express.Router();


const GalleryModel = require('../Model/Gallery')

GalleryRouter.get('/gallery', (req, res) => {
  

  GalleryModel.find().lean()
    .then(images =>{
       res.json(images)
      })
    .catch(err => res.status(400).json('Error: ' + err));
});





GalleryRouter.delete('/gallery/:id', async(req, res) => {
  const id = req.params.id;
 try{
  let blog = await GalleryModel.findById(id);
  const public_id = blog.public_id 
  // Delete from cloudinary
  await cloudinary.uploader.destroy(public_id)

   //  Delete the post from MongoDB
   await GalleryModel.findByIdAndDelete(id);
   res.json({ message: "Post deleted successfully" })

 }catch(error)
 {
  res.status(500).json({ error: error.message });
 }

})


const storage = multer.diskStorage({}); 
const upload = multer({ storage: storage });

GalleryRouter.post('/gallery', upload.single('image'), async (req, res) => {


  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
   
    const newBlog = new GalleryModel({
      image: result.secure_url,
      public_id: result.public_id
    });

    await newBlog.save();
    res.json({ message: "Successfully uploaded blog" })

  } catch (err) {
    console.log("Error uploading new blog".red.underline)
    console.log(err)
    res.status(500).json({ error: "Eror uploading blog post" })
  }
});



module.exports = GalleryRouter;
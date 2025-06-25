const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const EditorRouter = require('./Routes/Editor.js');
const SubscribeRouter = require('./Routes/Subscriber.js')
const AuthRouter = require('./Routes/Auth.js');
const FormRouter = require('./Routes/Form.js')
const GalleryRouter = require('./Routes/Gallery.js');
const compression = require("compression")

require('colors')
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}))
app.use(compression())
app.use(express.json());
app.use(cors());
app.use(EditorRouter);
app.use(SubscribeRouter)
app.use(AuthRouter);
app.use(FormRouter);
app.use(GalleryRouter);

// authentication

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'.green.bold))
  .catch(err=> console.log(err));


app.listen( process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
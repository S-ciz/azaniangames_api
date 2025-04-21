const express = require('express')
const SubscriberModel = require('../Model/Subscribe')
const SubscribeRouter = express.Router();



SubscribeRouter.get('/subscribers', (req, res) => {

    SubscriberModel.find().lean()
        .then(subscribers => res.json(subscribers))
        .catch(err => res.status(400).json("Error " + err))
})


SubscribeRouter.post('/subscribers', async (req, res) => {

    const { email } = req.body;


        const newSubscriber = new SubscriberModel({
            email: email
        });

        SubscriberModel.findOne({ email: email })
            .then(async (result) => {
                if (result === null) ///user does not exist
                {

                    await newSubscriber.save();
                    res.json("Successfully subscribed")

                } else {
                    res.status(500).json("User already exists")
                }
            })


  



})



module.exports = SubscribeRouter;
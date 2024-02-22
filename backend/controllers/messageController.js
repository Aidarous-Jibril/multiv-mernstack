const conversationModel = require("../models/conversationModel");
const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");


// create new conversation
const createNewMessage = asyncHandler(async (req, res, next) => {
    // console.log("BODY", req.body)
    try {
      const messageData = req.body;

      if (req.body.images) {
        const myCloud = await cloudinary.uploader.upload(req.body.images, {
          folder: "messages",
        });
        messageData.images = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        };
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Message({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });
// console.log("MESSAGE", message)
      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      res.status(500).json(error);
    }
    })


// get all messages with conversation id
const getAllMessagesWithConversation = async ( req, res, next ) => {
    try {
        const messages = await Message.find({
          conversationId: req.params.id,
        });
  
        res.status(201).json({
          success: true,
          messages,
        });
      } catch (error) {
        res.status(500).json(error);
      }
}

module.exports = {
    createNewMessage,
    getAllMessagesWithConversation,
}
const Conversation = require("../models/conversationModel");
const asyncHandler = require("express-async-handler");


// create new conversation
const createNewConversation = asyncHandler(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
  
      const isConversationExist = await Conversation.findOne({ groupTitle });
  
      let conversation;
      if (isConversationExist) {
        res.status(400).json({ msg: "conversation exists" });
        conversation = isConversationExist;
      } else {
        conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle,
        });
      }
  
      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Get conversations for store/seller
const getAllStoreAllConversations = asyncHandler(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: { $in: [req.params.id] },
      }).sort({ updatedAt: -1, createdAt: -1 });
  
      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Get conversations for user
const getAllUserConversations = asyncHandler(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: { $in: [req.params.id] },
      }).sort({ updatedAt: -1, createdAt: -1 });
  
      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Update the last message
const updateLastMessage = asyncHandler(async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(req.params.id, { lastMessage, lastMessageId });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found',
      });
    }

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = {
    createNewConversation,
    getAllStoreAllConversations,
    getAllUserConversations,
    updateLastMessage
  };
  
const express = require('express')
const router = express.Router()
const {     
    createNewConversation,
    getAllStoreAllConversations,
    getAllUserConversations,
    updateLastMessage
 } = require('../controllers/conversationController')
//  import { isAuthenticated } from "../middleware/authMiddleware"



router.post('/create-new-conversation', createNewConversation)
router.get('/get-all-store-conversations/:id', getAllStoreAllConversations)
router.get('/get-all-user-conversations/:id', getAllUserConversations)
// router.get('/get-all-user-conversations/:id', isAuthenticated, getAllUserConversations)
router.put('/update-last-message/:id', updateLastMessage )



module.exports = router

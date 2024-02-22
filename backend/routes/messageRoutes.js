const express = require('express')
const router = express.Router()
const {     
    createNewMessage,
    getAllMessagesWithConversation,
 } = require('../controllers/messageController')


// const multer = require('multer');

// const storage = multer.diskStorage({
//   filename: function (req,file,cb) {
//     cb(null, file.originalname)
//   }
// });

// const upload = multer({ storage: storage,limits:{fieldSize: 25 * 1024 * 1024} });

//  router.post('/create-new-message',  upload.array("images"), createNewMessage)
 router.post('/create-new-message', createNewMessage )
 router.get('/get-all-messages/:id', getAllMessagesWithConversation)



module.exports = router

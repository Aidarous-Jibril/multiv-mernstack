const express = require('express')
const router = express.Router()
const { createEvent, getAllStoreEvents, deleteEvent, getAllEvents } = require('../controllers/eventController')

// const multer = require('multer')
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const filename = file.originalname.split(".")[0];
//     cb(null, filename + '-' + uniqueSuffix + ".png");
//   }
// })

// const upload = multer({ storage: storage })


const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage,limits:{fieldSize: 25 * 1024 * 1024} });

router.post('/create-event',  upload.array("images"), createEvent)
router.get('/', getAllEvents )
router.get('/:id', getAllStoreEvents )
router.delete('/:id', deleteEvent )



module.exports = router

const express = require('express')
const router = express.Router()
const {
  registerStore,
  loginStore,
  logoutStore,
  getStoreInfo,
  updateStoreProfile,
  updateStoreAvatar
} = require('../controllers/storeController')
const { isSeller } = require('../middleware/authMiddleware')




const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage,limits:{fieldSize: 25 * 1024 * 1024} });

router.get('/logout', logoutStore)
router.get('/get-store-info/:id', getStoreInfo)
router.post('/register',  upload.single("avatar"), registerStore)
router.post('/login', loginStore)
router.put('/update-store-info', updateStoreProfile)
router.put('/update-avatar/:id', upload.single("avatar"), updateStoreAvatar)


module.exports = router

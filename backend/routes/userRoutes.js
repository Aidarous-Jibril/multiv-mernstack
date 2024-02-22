const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  updateUserAvatar,
  addUserAddress,
  deleteUserAddress,
  getUser,
  updateUserPassword
} = require('../controllers/userController')
const { isAuthenticated } = require('../middleware/authMiddleware')


const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage,limits:{fieldSize: 25 * 1024 * 1024} });


router.get('/logout', logoutUser)
router.get('/get-user-info/:id', getUser)
// router.get('/get-user/:freindId', isAuthenticated, loadUser)
router.post('/register', upload.single("avatar"), registerUser)
router.post('/add-address', isAuthenticated, addUserAddress)
router.post('/login', loginUser)
router.delete('/delete-user-address/:id', isAuthenticated, deleteUserAddress)
router.put('/update-user-info', updateUserProfile)
router.put('/update-avatar/:id', upload.single("avatar"), updateUserAvatar)
router.put('/update-user-password', isAuthenticated, updateUserPassword)

module.exports = router

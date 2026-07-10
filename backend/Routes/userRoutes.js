const express = require('express')
const router = express.Router()
const {createUser , getUser , getUserById , updateUser , deleteUser , createProfile , getProfile} = require('../Controller/userController')
const { requireAuth } = require('../Middleware/authMiddleware')



//user Profile
router.post('/createProfile', createProfile)
router.get('/profile', requireAuth, getProfile)

router.get('/',getUser)
router.post('/',createUser)
router.get('/:id',getUserById)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)




module.exports = router
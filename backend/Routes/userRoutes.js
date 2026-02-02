const express = require('express')
const router = express.Router()
const {createUser , getUser , getUserById , updateUser , deleteUser , createProfile , getProfile} = require('../Controller/userController')

router.get('/',getUser)
router.post('/',createUser)
router.get('/:id',getUserById)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)


//user Profile
router.post('/:id/createProfile',createProfile)
router.get('/:id/profile',getProfile)


module.exports = router
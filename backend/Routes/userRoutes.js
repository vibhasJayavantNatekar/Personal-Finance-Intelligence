const express = require('express')
const router = express.Router()
const {createUser , getUser , getUserById , updateUser , deleteUser , createProfile , getProfile} = require('../Controller/userController')

router.get('/',getUser)
router.post('/',createUser)
router.get('/:id',getUserById)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)


//user Profile
router.post('/createProfile/:id',createProfile)
router.get('/profile/:id',getProfile)


module.exports = router
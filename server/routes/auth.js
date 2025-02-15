// import ...
const express = require('express')
const router = express.Router()

// import controllers 
const { register,login,currentUser } = require('../controllers/auth')

// endpoints http://localhost:5001/api/...
router.post('/register',register)
router.post('/login',login)
router.post('/current-user',currentUser)
router.post('/current-admin',currentUser)

module.exports = router
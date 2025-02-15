// import ...
const express = require('express')
const router = express.Router()

// import controllers
const { create,list,remove } = require('../controllers/category')

// endpoints http://localhost:5001/api/category
router.post('/category',create)
router.get('/category',list)
router.delete('/category/:id',remove)

module.exports = router
// import ...
const express = require('express')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

// import controllers 
const { changeOrderStatus, getOrderAdmin } = require('../controllers/admin')

// endpoints http://localhost:5001/api/...
router.put('/admin/order-status', authCheck, changeOrderStatus)
router.get('/admin/orders', authCheck, getOrderAdmin)


module.exports = router
const express = require('express')
const router = express.Router()
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const { listUsers,
    chageStatus,
    chageRole,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    getOrder,
    emptyCart
} = require('../controllers/user')

// endpoint http://localhost:5001/api/.../
router.get('/users', authCheck, adminCheck, listUsers)
router.post('/chage-status', authCheck, adminCheck, chageStatus)
router.post('/chage-role', authCheck, adminCheck, chageRole)

router.post('/user/cart', authCheck, userCart)
router.get('/user/cart', authCheck, getUserCart)
router.delete('/user/cart', authCheck, emptyCart)

router.post('/user/address', authCheck, saveAddress)

router.post('/user/order', authCheck, saveOrder)
router.get('/user/order', authCheck, getOrder)


module.exports = router
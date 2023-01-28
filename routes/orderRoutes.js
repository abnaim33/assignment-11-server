const { getSingleUserOrder, createOrder,
    deleteOrder, getAdminOrders, updateOrder } = require('../controllers/orderController')


const router = require('express').Router()


router.get('/orders/me', getSingleUserOrder)

router.post('/order/create', createOrder)
router.get('/orders/all', getAdminOrders)
router.put('/order/update/:id', updateOrder)
router.delete('/order/delete', deleteOrder)

module.exports = router
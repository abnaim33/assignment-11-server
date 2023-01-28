const { getAllReviews, createReview, deleteReview } = require('../controllers/reviewController')

const router = require('express').Router()


router.get('/reviews', getAllReviews)
router.post('/review/create', createReview)
router.delete('/review/delete', deleteReview)

module.exports = router
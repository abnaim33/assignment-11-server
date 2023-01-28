const Review = require('../models/reviewModel')

exports.createReview = async (req, res) => {
    try {

        console.log(req.body)
        const { reviewText, userImage, email, username } = req.body

        const userReview = await Review.find({ email })

        console.log(userReview)

        if (userReview.email) {
            res.json({
                success: false,
                message: "Sorry, You have already reviewed"
            })
        } else {

            await Review.create({ reviewText, userImage, email, username })

            res.json({
                success: true,
                message: "Review Submitted successfully"
            })
            console.log('review created')

        }

    } catch (err) {
        res.json({
            message: err
        })
    }
}



// Get All Review
exports.getAllReviews = async (req, res, next) => {



    const reviews = await Review.find({})

    res.status(200).json({
        success: true,
        reviews

    });
};

// Get All Review (Admin)
exports.getAdminReviews = async (req, res, next) => {
    const Reviews = await Review.find();

    res.status(200).json({
        success: true,
        Reviews,
    });
};



// Update Review -- Admin


// Delete Review

exports.deleteReview = async (req, res, next) => {
    const Review = await Review.findById(req.headers.id);

    if (!Review) {
        res.status(404).json({
            success: true,
            message: "Review not found"
        });
    }



    await Review.remove();

    res.status(200).json({
        success: true,
        message: "Review Delete Successfully",
    });
};
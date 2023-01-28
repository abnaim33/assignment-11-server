const Order = require('../models/orderModel')

// const { initializeApp, getAuth } = require('firebase-admin/app');



var admin = require("firebase-admin");

var serviceAccount = require("../assignment-9-46021-firebase-adminsdk-65wqn-84f68d09c8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


exports.createOrder = async (req, res) => {
    try {
        const { email, displayName } = req.body.user

        const { orderDate } = req.body

        const ordered = await Order.create({
            email, username: displayName, orderDate
        })

        console.log(ordered)

        // console.log(req.body)

        res.json({
            success: true,
            message: "Order placed successfully",
            ordered
        })

    } catch (err) {
        console.log(err)
    }
}



// Get All Order for admin
exports.getSingleUserOrder = async (req, res, next) => {


    try {

        const email = req.headers.email
        console.log(req.headers.email)
        // req.headers.authorization
        const bearer = req.headers.authorization
        // console.log('bearer', bearer)
        if (bearer && bearer.startsWith('Bearer ')) {
            const idToken = bearer.split(" ")[1]


            // getAuth()
            admin.auth()
                .verifyIdToken(idToken)
                .then(async (decodedToken) => {
                    const tokenEmail = decodedToken.email;

                    if (tokenEmail == req.headers.email) {
                        const orders = await Order.find({ email })

                        res.json({
                            success: true,
                            orders
                        })
                    } else {
                        res.status(401).send('un-authorize success')
                    }


                    // ...
                })
                .catch((error) => {
                    // Handle error
                    console.log(error)
                    res.status(401).send('un-authorize success')
                });

        } else {
            res.status(401).send('un-authorize success')
        }

        // idToken comes from the client app

        // console.log(req.headers.authorization)




    } catch (err) {
        console.log(err)
    }
};

// Get All Order (Admin)
exports.getAdminOrders = async (req, res, next) => {
    const orders = await Order.find();

    res.status(200).json({
        success: true,
        orders,
    });
};



// Update Order -- Admin
exports.updateOrder = async (req, res) => {

    console.log(req.body)

    const order = await Order.findById(req.params.id)

    if (!order) {
        res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    order.orderStatus = req.body.status;

    await order.save();



    res.status(200).json({
        success: true,
        message: "Order updated Successfully",
        order
    });

}

// Delete Order

exports.deleteOrder = async (req, res, next) => {
    const Order = await Order.findById(req.headers.id);

    if (!Order) {
        res.status(404).json({
            success: true,
            message: "Order not found"
        });
    }



    await Order.remove();

    res.status(200).json({
        success: true,
        message: "Order Delete Successfully",
    });
};